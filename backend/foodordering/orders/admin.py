from django.conf import settings
from django.contrib import admin, messages
from twilio.rest import Client
from .models import Drop, PreOrder
from .views import normalize_phone


@admin.action(description='Send drop announcement to all past customers')
def announce_drop(modeladmin, request, queryset):
    if queryset.count() != 1:
        modeladmin.message_user(request, 'Select exactly one drop to announce.', level=messages.WARNING)
        return

    drop = queryset.first()
    drop_date = drop.date.strftime('%B %d, %Y')
    phones = list(PreOrder.objects.values_list('phone', flat=True).distinct())

    if not phones:
        modeladmin.message_user(request, 'No past customers to text.', level=messages.WARNING)
        return

    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    site_url = getattr(settings, 'SITE_URL', '')
    sent = failed = 0

    for phone in phones:
        try:
            body = f"De la Nana's next pupusa drop is on {drop_date}!"
            if site_url:
                body += f" Pre-order now: {site_url}"
            client.messages.create(
                body=body,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=normalize_phone(phone),
            )
            sent += 1
        except Exception as e:
            print(f"[Twilio] Announcement failed for {phone}: {e}")
            failed += 1

    msg = f'Announcement sent to {sent} customer{"s" if sent != 1 else ""}.'
    if failed:
        msg += f' {failed} failed — check server logs.'
    modeladmin.message_user(request, msg, level=messages.SUCCESS if not failed else messages.WARNING)


class PreOrderInline(admin.TabularInline):
    model = PreOrder
    extra = 0
    readonly_fields = ('name', 'phone', 'email', 'revueltas', 'queso', 'queso_frijol', 'loroco', 'notes', 'created_at')
    fields = ('name', 'phone', 'revueltas', 'queso', 'queso_frijol', 'loroco', 'notes', 'status', 'created_at')


@admin.register(Drop)
class DropAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'date', 'capacity', 'is_active', 'order_count')
    list_editable = ('is_active',)
    inlines = [PreOrderInline]
    actions = [announce_drop]

    def order_count(self, obj):
        return obj.preorders.count()
    order_count.short_description = 'Orders'


@admin.register(PreOrder)
class PreOrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'drop', 'total_pupusas', 'revueltas', 'queso', 'queso_frijol', 'loroco', 'status', 'created_at')
    list_filter = ('drop', 'status')
    search_fields = ('name', 'phone', 'email')
    list_editable = ('status',)
    readonly_fields = ('created_at',)
