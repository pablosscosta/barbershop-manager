from django.urls import path
from .views import health_check, dashboard

urlpatterns = [
    path("health/", health_check),
    path("dashboard/", dashboard),
]
