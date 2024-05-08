from django.shortcuts import render

from rest_framework import viewsets, permissions
from apps.contact.models import Message
from .serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAdminUser()]