from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HealthCheckView, RegisterView, BarberViewSet, ServiceViewSet, CustomerViewSet, AppointmentViewSet, DashboardSummaryView

router = DefaultRouter()
router.register(r'barbers', BarberViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'appointments', AppointmentViewSet)


urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="health-check"),
    path("register/", RegisterView.as_view(), name="register"),
    path("dashboard/summary/", DashboardSummaryView.as_view(), name="dashboard-summary"),
    path('', include(router.urls)),
]
