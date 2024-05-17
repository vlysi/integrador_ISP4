from django.db import models
from apps.users.models import User

# Create your models here.
class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    method = models.CharField(max_length=50)
    price= models.DecimalField(max_digits=50, decimal_places=2)
    status = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'

    def __str__(self):
        return f"User: {self.user}, Method: {self.method}, Price: ${self.price}, Status: {self.status}"