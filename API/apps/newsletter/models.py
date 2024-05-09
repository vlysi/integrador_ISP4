from django.db import models


class Newsletter(models.Model): #modelo de newsletter
    email = models.EmailField(unique=True, error_messages={'unique': "El correo electrónico ingresado ya está registrado."})
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta: #metadatos
        verbose_name = 'Lista de suscriptores' #nombre en singular
        verbose_name_plural = 'Lista de suscriptores' #nombre en plural

    def __str__(self):
        return self.email
