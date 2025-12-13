from django.urls import path
from .views import health_check, dashboard, register

urlpatterns = [
    path("health/", health_check),
    path("dashboard/", dashboard),
    path("register/", register),
]
