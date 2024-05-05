from django.shortcuts import render
from apps.payments.models import Payment
from .serializers import PaymentSerializer
from rest_framework import  permissions, viewsets

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAdminUser]
