from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Customer, Service, Barber, Appointment


class CustomerAPITest(APITestCase):
    def setUp(self):
        # cria usuário
        self.user = User.objects.create_user(username="tester", password="123456")

        # gera token JWT
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)

        # autentica client com JWT
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

    def test_create_customer(self):
        url = "/api/customers/"
        data = {"name": "João Silva", "email": "joao@example.com", "phone": "555-1234"}
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.get().name, "João Silva")

    def test_list_customers(self):
        Customer.objects.create(name="Maria", email="maria@example.com")
        Customer.objects.create(name="Carlos", email="carlos@example.com")

        url = "/api/customers/"
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

class ServiceAPITest(APITestCase):
    def setUp(self):
        # cria usuário e autentica com JWT
        self.user = User.objects.create_user(username="tester", password="123456")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

    def test_create_service(self):
        url = "/api/services/"
        data = {
            "name": "Corte de cabelo",
            "duration_minutes": 30,
            "price": "50.00",
            "description": "Corte simples"
        }
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Service.objects.count(), 1)
        self.assertEqual(Service.objects.get().name, "Corte de cabelo")

    def test_list_services(self):
        Service.objects.create(name="Barba", duration_minutes=20, price="30.00")
        Service.objects.create(name="Coloração", duration_minutes=45, price="80.00")

        url = "/api/services/"
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], "Barba")

    def test_create_service_missing_duration(self):
        url = "/api/services/"
        data = {"name": "Teste sem duração", "price": "40.00"}
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class BarberAPITest(APITestCase):
    def setUp(self):
        # cria usuário e autentica com JWT
        self.user = User.objects.create_user(username="tester", password="123456")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

    def test_create_barber(self):
        url = "/api/barbers/"
        data = {"name": "Carlos Barber"}
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Barber.objects.count(), 1)
        self.assertEqual(Barber.objects.get().name, "Carlos Barber")
        self.assertTrue(Barber.objects.get().is_active)  # default True

    def test_list_barbers(self):
        Barber.objects.create(name="Pedro Barber")
        Barber.objects.create(name="João Barber", is_active=False)

        url = "/api/barbers/"
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], "Pedro Barber")


class AppointmentAPITest(APITestCase):
    def setUp(self):
        # cria usuário e autentica com JWT
        self.user = User.objects.create_user(username="tester", password="123456")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

        # cria dados base
        self.customer = Customer.objects.create(name="Maria", email="maria@example.com")
        self.barber = Barber.objects.create(name="Pedro Barber")
        self.service = Service.objects.create(name="Barba", duration_minutes=20, price="30.00")

    def test_create_appointment(self):
        url = "/api/appointments/"
        data = {
            "customer_id": self.customer.id,
            "barber_id": self.barber.id,
            "service_id": self.service.id,
            "scheduled_time": timezone.now().isoformat().replace("+00:00", "Z"),
            "price": "30.00"
        }
        response = self.client.post(url, data, format="json")

        print("Response status:", response.status_code)
        print("Response data:", response.data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Appointment.objects.count(), 1)
        appointment = Appointment.objects.get()
        self.assertEqual(appointment.customer, self.customer)
        self.assertEqual(appointment.barber, self.barber)
        self.assertEqual(appointment.service, self.service)
        self.assertEqual(appointment.status, "scheduled")


    def test_list_appointments(self):
        Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            service=self.service,
            scheduled_time=timezone.now(),
            price="30.00"
        )
        url = "/api/appointments/"
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["customer"]["id"], self.customer.id)

    def test_create_appointment_missing_scheduled_time(self):
        url = "/api/appointments/"
        data = {
            "customer": self.customer.id,
            "barber": self.barber.id,
            "service": self.service.id,
            "price": "30.00"
        }
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_appointment_invalid_status(self):
        url = "/api/appointments/"
        data = {
            "customer": self.customer.id,
            "barber": self.barber.id,
            "service": self.service.id,
            "scheduled_time": timezone.now().isoformat().replace("+00:00", "Z"),
            "price": "30.00",
            "status": "invalid_status"
        }
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
