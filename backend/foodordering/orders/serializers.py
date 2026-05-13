from django.db.models import Sum, F
from rest_framework import serializers
from .models import Drop, PreOrder


def pupusas_ordered(drop):
    result = drop.preorders.aggregate(
        total=Sum(F('revueltas') + F('queso') + F('queso_frijol') + F('loroco'))
    )
    return result['total'] or 0


class DropSerializer(serializers.ModelSerializer):
    spots_remaining = serializers.SerializerMethodField()

    class Meta:
        model = Drop
        fields = ['id', 'date', 'capacity', 'spots_remaining']

    def get_spots_remaining(self, obj):
        return max(obj.capacity - pupusas_ordered(obj), 0)


class PreOrderSerializer(serializers.ModelSerializer):
    drop = serializers.PrimaryKeyRelatedField(queryset=Drop.objects.filter(is_active=True))

    class Meta:
        model = PreOrder
        fields = ['id', 'drop', 'name', 'email', 'phone', 'revueltas', 'queso', 'queso_frijol', 'loroco', 'notes']

    def validate(self, data):
        total = data.get('revueltas', 0) + data.get('queso', 0) + data.get('queso_frijol', 0) + data.get('loroco', 0)
        if total == 0:
            raise serializers.ValidationError('Order must include at least one pupusa.')

        drop = data.get('drop')
        if drop:
            remaining = max(drop.capacity - pupusas_ordered(drop), 0)
            if total > remaining:
                raise serializers.ValidationError(
                    f'Only {remaining} pupusa{"s" if remaining != 1 else ""} remaining in this drop.'
                )
        return data
