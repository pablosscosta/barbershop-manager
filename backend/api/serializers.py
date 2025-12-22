from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Barber, Service, Customer, Appointment

# Serializador User
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password")

    def create(self, validated_data):
        user = User(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user

# Serializador Cliente
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"

# Serializador Barbeiro
class BarberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barber
        fields = "__all__"

# Serializador Serviço
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

# Serializador Agendamento
class AppointmentSerializer(serializers.ModelSerializer):
    barber = BarberSerializer(read_only=True)
    service = ServiceSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    barber_id = serializers.PrimaryKeyRelatedField(
        queryset=Barber.objects.all(), source="barber", write_only=True
    )
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), source="service", write_only=True
    )
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(), source="customer", write_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "barber",
            "service",
            "customer",
            "scheduled_time",
            "status",
            "price",
            "barber_id",
            "service_id",
            "customer_id",
        ]

    def validate(self, data):
        barber = data.get("barber")
        if barber and not barber.is_active:
            raise serializers.ValidationError({
                "barber_id": "Cannot create appointment with inactive barber"
            })
        return data

