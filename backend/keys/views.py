from rest_framework import viewsets
from keys.models import Key
from keys.serializers import KeySerializer


class KeyViewSet(viewsets.ModelViewSet):
    queryset = Key.objects.all()
    serializer_class = KeySerializer
