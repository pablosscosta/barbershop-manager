from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import health_check, register, BarberViewSet, ServiceViewSet, CustomerViewSet, AppointmentViewSet

router = DefaultRouter()
router.register(r'barbers', BarberViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'appointments', AppointmentViewSet)


urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('register/', register, name='register'),
    path('', include(router.urls)),
]
