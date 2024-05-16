from rest_framework import serializers
from django.contrib.auth.models import User
from apps.payments.models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        user = serializers.StringRelatedField()
        model = Payment
        fields = ['id', 'user', 'method', 'price', 'status', 'user_email']
