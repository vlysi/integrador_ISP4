from rest_framework import serializers
from django.contrib.auth.models import User
from apps.payments.models import Payment
class PayerSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
class PaymentSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        user = serializers.StringRelatedField()
        model = Payment
        fields = ['id', 'user', 'method', 'price', 'status', 'user_email']


class ItemSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    quantity = serializers.IntegerField(min_value=1)
    unit_price = serializers.DecimalField(max_digits=10, decimal_places=2)

    def to_representation(self, instance):
        # Este método modifica la representación de salida del serializer para asegurar que el decimal sea un string
        data = super().to_representation(instance)
        data['unit_price'] = str(data['unit_price'])
        return data

class PreferenceSerializer(serializers.Serializer):
    items = ItemSerializer(many=True)
    payer = PayerSerializer()  # Añade el serializer del pagador
    back_urls = serializers.DictField(child=serializers.URLField())
    auto_return = serializers.ChoiceField(choices=['approved', 'all', 'none'])