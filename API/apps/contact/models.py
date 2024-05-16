from django.db import models

class Message(models.Model):
    name=models.CharField(max_length=20)
    last_name=models.CharField(max_length=20)
    email=models.EmailField(blank=False, null=False)
    message = models.TextField()  
    
    class Meta:
        verbose_name = 'Mensaje'
        verbose_name_plural = 'Mensajes'
    
    def __str__(self):
        return f"mensaje de: {self.name} {self.last_name} - {self.email}- {self.message} "

