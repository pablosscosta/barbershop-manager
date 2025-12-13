from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    return Response({"message": "Acesso autorizado. Bem-vindo ao dashboard!"})
