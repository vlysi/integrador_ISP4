from django.db import models
from apps.users.models import User

# Create your models here.
class Payment(models.Model):
    
    METHOD_CHOICES = (
        ('Efectivo', 'Efectivo'),
        ('Debito', 'Débito'),
        ('Credito', 'Crédito'),
    )
    STATUS_CHOICES = (
        ('Pendiente', 'Pendiente'),
        ('Completado', 'Completado'),
        ('Fallido', 'Fallido'),
        ('Cancelado', 'Cancelado'),
        ('Reembolsado', 'Reembolsado'),
    )

    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    method = models.CharField(max_length=10, choices=METHOD_CHOICES)
    price= models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)

    class Meta:
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'

    def __str__(self):
        return f"User: {self.user}, Method: {self.get_method_display()}, Price: ${self.price}, Status: {self.status}"