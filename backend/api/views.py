from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    RegisterSerializer,
    RegisterResponseSerializer,
    CustomerSerializer,
    BarberSerializer,
    ServiceSerializer,
    AppointmentSerializer,
    HealthCheckSerializer
    )
from .models import Customer, Barber, Service, Appointment
from drf_spectacular.utils import extend_schema, extend_schema_view, extend_schema_field, OpenApiResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class HealthCheckView(APIView):
    serializer_class = HealthCheckSerializer

    @extend_schema(
        description="Retorna o status de saúde da API",
        responses={200: HealthCheckSerializer},
        tags=["Sistema"]
    )
    def get(self, request):
        return Response({"status": "ok"})


class RegisterView(APIView):
    serializer_class = RegisterSerializer

    @extend_schema(
        request=RegisterSerializer,
        responses={
            201: OpenApiResponse(
                response=RegisterResponseSerializer,
                description="Usuário criado com sucesso"
            ),
            400: OpenApiResponse(description="Dados inválidos")
        },
        tags=["Autenticação"],
        description="Endpoint para registrar um novo usuário"
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                RegisterResponseSerializer(user).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Documentação API Barber
@extend_schema(tags=["Barbeiros"])
@extend_schema_view(
    list=extend_schema(
        description="Lista todos os barbeiros cadastrados",
        responses={200: BarberSerializer}
    ),
    retrieve=extend_schema(
        description="Detalha um barbeiro pelo ID",
        responses={200: BarberSerializer}        
    ),
    create=extend_schema(
        description="Cria um novo barbeiro",
        request=BarberSerializer,
        responses={201: BarberSerializer}
    ),
    update=extend_schema(
        description="Atualiza um barbeiro existente",
        request=BarberSerializer,
        responses={200: BarberSerializer}
    ),
    destroy=extend_schema(
        description="Remove um barbeiro",
        responses={204: None}
    ),
)
# View do Barbeiro
class BarberViewSet(viewsets.ModelViewSet):
    queryset = Barber.objects.all()
    serializer_class = BarberSerializer
    permission_classes = [IsAuthenticated]


# Documentação API Service
@extend_schema(tags=["Serviços"])
@extend_schema_view(
    list=extend_schema(
        description="Lista todos os serviços cadastrados",
        responses={200: ServiceSerializer}
    ),
    retrieve=extend_schema(
        description="Detalha um serviço pelo ID",
        responses={200: ServiceSerializer}        
    ),
    create=extend_schema(
        description="Cria um novo serviço",
        request=ServiceSerializer,
        responses={201: ServiceSerializer}
    ),
    update=extend_schema(
        description="Atualiza um serviço existente",
        request=ServiceSerializer,
        responses={200: ServiceSerializer}
    ),
    destroy=extend_schema(
        description="Remove um serviço",
        responses={204: None}
    ),
)
# View do Serviço
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]


# Documentação API Customer
@extend_schema(tags=["Clientes"])
@extend_schema_view(
    list=extend_schema(
        description="Lista todos os clientes cadastrados",
        responses={200: CustomerSerializer}
    ),
    retrieve=extend_schema(
        description="Detalha um cliente pelo ID",
        responses={200: CustomerSerializer}        
    ),
    create=extend_schema(
        description="Cria um novo cliente",
        request=CustomerSerializer,
        responses={201: CustomerSerializer}
    ),
    update=extend_schema(
        description="Atualiza um cliente existente",
        request=CustomerSerializer,
        responses={200: CustomerSerializer}
    ),
    destroy=extend_schema(
        description="Remove um cliente",
        responses={204: None}
    ),
)
# View do Cliente
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]


# Documentação API Appointment
@extend_schema(tags=["Agendamentos"])
@extend_schema_view(
    list=extend_schema(
        description="Lista todos os agendamentos cadastrados",
        responses={200: AppointmentSerializer}
    ),
    retrieve=extend_schema(
        description="Detalha um agendamento pelo ID",
        responses={200: AppointmentSerializer}        
    ),
    create=extend_schema(
        description="Cria um novo agendamento",
        request=AppointmentSerializer,
        responses={201: AppointmentSerializer}
    ),
    update=extend_schema(
        description="Atualiza um agendamento existente",
        request=AppointmentSerializer,
        responses={200: AppointmentSerializer}
    ),
    destroy=extend_schema(
        description="Remove um agendamento",
        responses={204: None}
    ),
)
# View do Agendamento
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]


# Documentação API Tokens
@extend_schema(
    tags=["Autenticação"],
    description="Obtém token JWT (access e refresh) a partir de username e password"
)
class DocsTokenObtainPairView(TokenObtainPairView):
    pass


@extend_schema(
    tags=["Autenticação"],
    description="Atualiza o token de acesso usando o refresh token"
)
class DocsTokenRefreshView(TokenRefreshView):
    pass
