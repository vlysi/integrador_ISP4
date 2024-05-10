from django.shortcuts import render
from apps.payments.models import Payment
from .serializers import PaymentSerializer
from rest_framework import  permissions, viewsets
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
import mercadopago
from django.conf import settings

class PaymentMethodsView(APIView):
    def get(self, request):
        sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
        payment_methods_response = sdk.payment_methods().list_all()
        payment_methods = payment_methods_response.get("response", [])
        return Response(payment_methods)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    #permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
        payment_data = {
            "transaction_amount": float(request.data.get('price')),
            "description": "Descripción del producto",
            "payment_method_id": request.data.get('method').lower(),
            "payer": {
                "email": request.user.email
            },
        }
        payment_result = sdk.payment().create(payment_data)
        response = payment_result.get("response", {})
        print(response)

        # Actualizar o crear el objeto Payment
        if response.get("status") == "approved":  # Asumiendo que 'approved' significa completado
            payment_status = 'Completado'
        else:
            payment_status = 'Pendiente'

        payment = Payment(
            user=request.user,
            method=request.data.get('method'),
            price=request.data.get('price'),
            status=payment_status,
        )
        payment.save()
        
        return Response({
            'status': payment_status,
            'detail': response
        })

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        payment = self.get_object()
        payment.status = request.data.get('status', payment.status)
        payment.save()
        return Response({'status': 'updated'})
class PaymentViewSet1(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    #permission_classes = [permissions.IsAdminUser]
