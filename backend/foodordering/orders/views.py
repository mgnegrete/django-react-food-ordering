from django.conf import settings
from django.http import Http404
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from twilio.rest import Client
from .models import Drop, PreOrder
from .serializers import DropSerializer, PreOrderSerializer


def normalize_phone(phone):
    digits = ''.join(filter(str.isdigit, phone))
    if len(digits) == 10:
        return f'+1{digits}'
    if len(digits) == 11 and digits.startswith('1'):
        return f'+{digits}'
    return phone


def send_confirmation_text(order):
    drop_date = order.drop.date.strftime('%B %d, %Y')
    message = (
        f"Hey {order.name}! Your Casa Puchica pre-order is confirmed — "
        f"{order.total_pupusas()} pupusa{'s' if order.total_pupusas() != 1 else ''} for {drop_date}. "
        f"We'll text you pickup details soon!"
    )
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    client.messages.create(
        body=message,
        from_=settings.TWILIO_PHONE_NUMBER,
        to=normalize_phone(order.phone),
    )


class ActiveDropView(APIView):
    def get(self, request):
        drop = Drop.objects.filter(is_active=True).first()
        if not drop:
            return Response({'detail': 'No active drop.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(DropSerializer(drop).data)


class PreOrderCreateView(generics.CreateAPIView):
    queryset = PreOrder.objects.all()
    serializer_class = PreOrderSerializer

    def perform_create(self, serializer):
        order = serializer.save()
        try:
            send_confirmation_text(order)
        except Exception as e:
            # Don't fail the order if the text fails — log it and move on
            print(f"[Twilio] Failed to send SMS for order {order.id}: {e}")


def kitchen_display(request, secret):
    if secret != settings.KITCHEN_SECRET:
        raise Http404
    drop = Drop.objects.filter(is_active=True).first()
    orders = drop.preorders.order_by('created_at') if drop else []
    return render(request, 'orders/kitchen.html', {'drop': drop, 'orders': orders})
