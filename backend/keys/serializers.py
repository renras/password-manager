from rest_framework import serializers
from keys.models import Secret


class SecretSerializer(serializers.ModelSerializer):
    class Meta:
        model = Secret
        fields = ['id', 'created', 'key', 'value']
