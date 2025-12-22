from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone


class IntegrationFlowTest(APITestCase):
    def setUp(self):
        # cria usuário e autentica com JWT
        self.user = User.objects.create_user(username="tester", password="123456")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

    def test_full_flow_create_appointment(self):
        # 1. cria Customer
        customer_resp = self.client.post("/api/customers/", {
            "name": "Maria",
            "email": "maria@example.com",
            "phone": "555-1234"
        }, format="json")
        self.assertEqual(customer_resp.status_code, status.HTTP_201_CREATED)
        customer_id = customer_resp.data["id"]

        # 2. cria Barber
        barber_resp = self.client.post("/api/barbers/", {
            "name": "Pedro Barber"
        }, format="json")
        self.assertEqual(barber_resp.status_code, status.HTTP_201_CREATED)
        barber_id = barber_resp.data["id"]

        # 3. cria Service
        service_resp = self.client.post("/api/services/", {
            "name": "Corte de cabelo",
            "duration_minutes": 30,
            "price": "50.00",
            "description": "Corte simples"
        }, format="json")
        self.assertEqual(service_resp.status_code, status.HTTP_201_CREATED)
        service_id = service_resp.data["id"]

        # 4. cria Appointment usando os IDs anteriores
        appointment_resp = self.client.post("/api/appointments/", {
            "customer_id": customer_id,
            "barber_id": barber_id,
            "service_id": service_id,
            "scheduled_time": timezone.now().isoformat().replace("+00:00", "Z"),
            "price": "50.00"
        }, format="json")
        self.assertEqual(appointment_resp.status_code, status.HTTP_201_CREATED)

        # 5. valida listagem de Appointment
        list_resp = self.client.get("/api/appointments/", format="json")
        self.assertEqual(list_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_resp.data), 1)
        self.assertEqual(list_resp.data[0]["customer"]["id"], customer_id)
        self.assertEqual(list_resp.data[0]["barber"]["id"], barber_id)
        self.assertEqual(list_resp.data[0]["service"]["id"], service_id)


class IntegrationFlowTest(APITestCase):
    def setUp(self):
        # cria usuário e autentica com JWT
        self.user = User.objects.create_user(username="tester", password="123456")
        refresh = RefreshToken.for_user(self.user)
        self.token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)

    def test_full_flow_create_appointment(self):
        # fluxo completo já implementado...
        ...

    def test_flow_appointment_with_inactive_barber(self):
        # 1. cria Customer
        customer_resp = self.client.post("/api/customers/", {
            "name": "Carlos",
            "email": "carlos@example.com",
            "phone": "555-5678"
        }, format="json")
        self.assertEqual(customer_resp.status_code, status.HTTP_201_CREATED)
        customer_id = customer_resp.data["id"]

        # 2. cria Barber inativo
        barber_resp = self.client.post("/api/barbers/", {
            "name": "João Barber",
            "is_active": False
        }, format="json")
        self.assertEqual(barber_resp.status_code, status.HTTP_201_CREATED)
        barber_id = barber_resp.data["id"]

        # 3. cria Service
        service_resp = self.client.post("/api/services/", {
            "name": "Coloração",
            "duration_minutes": 45,
            "price": "80.00",
            "description": "Coloração completa"
        }, format="json")
        self.assertEqual(service_resp.status_code, status.HTTP_201_CREATED)
        service_id = service_resp.data["id"]

        # 4. tenta criar Appointment com Barber inativo
        appointment_resp = self.client.post("/api/appointments/", {
            "customer_id": customer_id,
            "barber_id": barber_id,
            "service_id": service_id,
            "scheduled_time": timezone.now().isoformat().replace("+00:00", "Z"),
            "price": "80.00"
        }, format="json")

        # 5. valida que falhou com 400
        self.assertEqual(appointment_resp.status_code, status.HTTP_400_BAD_REQUEST)
