from django.db import models


class Drop(models.Model):
    date = models.DateTimeField()
    capacity = models.PositiveIntegerField(help_text='Max number of pupusas for this drop')
    is_active = models.BooleanField(default=False, help_text='Only one drop should be active at a time')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Drop — {self.date.strftime('%B %d, %Y')}"

    class Meta:
        ordering = ['-date']


class PreOrder(models.Model):
    STATUS_CHOICES = [
        ('pending',   'Pending'),
        ('confirmed', 'Confirmed'),
        ('ready',     'Ready'),
        ('completed', 'Completed'),
    ]

    drop = models.ForeignKey(Drop, on_delete=models.PROTECT, related_name='preorders')

    # Customer info
    name  = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    # Fillings
    revueltas    = models.PositiveIntegerField(default=0)
    queso        = models.PositiveIntegerField(default=0)
    queso_frijol = models.PositiveIntegerField(default=0)
    loroco       = models.PositiveIntegerField(default=0)

    notes     = models.TextField(blank=True)
    status    = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def total_pupusas(self):
        return self.revueltas + self.queso + self.queso_frijol + self.loroco

    def __str__(self):
        return f"{self.name} — {self.total_pupusas()} pupusas"

    class Meta:
        ordering = ['created_at']
