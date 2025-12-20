from django.db import models

# Model Cliente
class Customer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name

# Model Barbeiro
class Barber(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)  # útil para férias/licença sem apagar da base

    def __str__(self):
        return self.name

# Model Serviço
class Service(models.Model):
    name = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# Model Agendamento
class Appointment(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "Agendado"),
        ("completed", "Concluído"),
        ("canceled", "Cancelado"),
    ]

    barber = models.ForeignKey(Barber, on_delete=models.CASCADE, related_name="appointments")
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="appointments")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="appointments")
    scheduled_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="scheduled")
    price = models.DecimalField(max_digits=8, decimal_places=2)  # duplicado para histórico

    def __str__(self):
        return f"{self.customer.name} - {self.service.name} ({self.scheduled_time})"
