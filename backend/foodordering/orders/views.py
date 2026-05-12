from django.conf import settings
from django.http import Http404
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Drop, PreOrder
from .serializers import DropSerializer, PreOrderSerializer


class ActiveDropView(APIView):
    def get(self, request):
        drop = Drop.objects.filter(is_active=True).first()
        if not drop:
            return Response({'detail': 'No active drop.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(DropSerializer(drop).data)


class PreOrderCreateView(generics.CreateAPIView):
    queryset = PreOrder.objects.all()
    serializer_class = PreOrderSerializer


def kitchen_display(request, secret):
    if secret != settings.KITCHEN_SECRET:
        raise Http404
    drop = Drop.objects.filter(is_active=True).first()
    orders = drop.preorders.order_by('created_at') if drop else []
    return render(request, 'orders/kitchen.html', {'drop': drop, 'orders': orders})
