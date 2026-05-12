from django.contrib import admin
from .models import Drop, PreOrder


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
