from rest_framework import serializers
from keys.models import Key


class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        fields = ['id', 'created', 'key', 'value']
