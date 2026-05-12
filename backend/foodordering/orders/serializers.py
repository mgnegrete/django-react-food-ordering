from rest_framework import serializers
from .models import Drop, PreOrder


class DropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drop
        fields = ['id', 'date', 'capacity']


class PreOrderSerializer(serializers.ModelSerializer):
    drop = serializers.PrimaryKeyRelatedField(queryset=Drop.objects.filter(is_active=True))

    class Meta:
        model = PreOrder
        fields = ['id', 'drop', 'name', 'email', 'phone', 'revueltas', 'queso', 'queso_frijol', 'loroco', 'notes']

    def validate(self, data):
        total = data.get('revueltas', 0) + data.get('queso', 0) + data.get('queso_frijol', 0) + data.get('loroco', 0)
        if total == 0:
            raise serializers.ValidationError('Order must include at least one pupusa.')
        return data
