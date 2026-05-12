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
