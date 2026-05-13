from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import PreOrder


@receiver(pre_save, sender=PreOrder)
def _track_status(sender, instance, **kwargs):
    if instance.pk:
        try:
            instance._pre_save_status = PreOrder.objects.get(pk=instance.pk).status
        except PreOrder.DoesNotExist:
            instance._pre_save_status = None
    else:
        instance._pre_save_status = None


@receiver(post_save, sender=PreOrder)
def _notify_order_ready(sender, instance, created, **kwargs):
    if created:
        return
    old = getattr(instance, '_pre_save_status', None)
    if old != 'ready' and instance.status == 'ready':
        from .views import send_ready_text
        try:
            send_ready_text(instance)
        except Exception as e:
            print(f"[Twilio] Ready SMS failed for order {instance.id}: {e}")
