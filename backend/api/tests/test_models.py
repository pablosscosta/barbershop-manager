from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone

from api.models import Customer, Barber, Service, Appointment


class CustomerModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.customer = Customer.objects.create(
            name="João Silva",
            email="joao@example.com",
            phone="555-1234",
        )

    def test_create_customer(self):
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(self.customer.name, "João Silva")

    def test_required_name(self):
        customer = Customer(email="semnome@example.com", phone="000")
        with self.assertRaises(ValidationError):
            customer.full_clean()

    def test_email_format_optional_but_valid_if_present(self):
        self.customer.email = "joao+tag@example.com"
        self.customer.full_clean()
        self.customer.save()


class BarberModelTest(TestCase):
    def test_create_barber(self):
        barber = Barber.objects.create(name="Carlos Barber")
        self.assertEqual(Barber.objects.count(), 1)
        self.assertEqual(barber.name, "Carlos Barber")

    def test_required_name(self):
        barber = Barber()
        with self.assertRaises(ValidationError):
            barber.full_clean()


class ServiceModelTest(TestCase):
    def test_create_service(self):
        service = Service.objects.create(name="Corte de cabelo", duration_minutes=30, price=50)
        self.assertEqual(Service.objects.count(), 1)
        self.assertEqual(service.price, 50)

    def test_required_fields(self):
        service = Service()
        with self.assertRaises(ValidationError):
            service.full_clean()

    def test_price_non_negative(self):
        service = Service(name="Barba", price=-10)
        with self.assertRaises(ValidationError):
            service.full_clean()


class AppointmentModelTest(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create(name="Maria", email="maria@example.com")
        self.barber = Barber.objects.create(name="Pedro Barber")
        self.service = Service.objects.create(name="Barba", duration_minutes=20, price=30.00)

    def test_create_appointment(self):
        appointment = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            service=self.service,
            scheduled_time=timezone.now(),
            status="scheduled",
            price=self.service.price
        )
        self.assertEqual(Appointment.objects.count(), 1)
        self.assertEqual(appointment.customer.name, "Maria")
        self.assertEqual(appointment.service.duration_minutes, 20)

    def test_scheduled_time_required(self):
        appointment = Appointment(
            customer=self.customer,
            barber=self.barber,
            service=self.service,
            price=self.service.price
        )
        with self.assertRaises(ValidationError):
            appointment.full_clean()

    def test_status_default(self):
        appointment = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            service=self.service,
            scheduled_time=timezone.now(),
            price=self.service.price
        )
        self.assertEqual(appointment.status, "scheduled")
