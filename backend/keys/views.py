from rest_framework import viewsets
from keys.models import Secret
from keys.serializers import SecretSerializer


class SecretViewSet(viewsets.ModelViewSet):
    queryset = Secret.objects.all()
    serializer_class = SecretSerializer
