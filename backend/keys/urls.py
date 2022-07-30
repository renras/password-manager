from django.urls import path, include
from rest_framework.routers import DefaultRouter
from keys import views

router = DefaultRouter()
# router.register(r'secrets', views.SecretViewSet, basename="secrets")
router.register(r'', views.KeyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
