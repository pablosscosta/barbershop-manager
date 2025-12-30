from django.contrib import admin
from django.urls import path, include
from core.views import home
from api.views import (
    DocsTokenObtainPairView,
    DocsTokenRefreshView,
)
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path("api/", include("api.urls")),
    path('api/token/', DocsTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', DocsTokenRefreshView.as_view(), name='token_refresh'),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
