from django.shortcuts import render
from apps.payments.models import Payment
from .serializers import PaymentSerializer,PreferenceSerializer
from rest_framework import  permissions, viewsets
from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
import json
from rest_framework import status
import mercadopago
from apps.users.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def payment_notification(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
            # ID de la notificación de pago recibida
            payment_id = data.get('data', {}).get('id')
            if payment_id:
                # Obtener la información completa del pago
                payment_info = sdk.payment().get(payment_id)
                if payment_info['response']['status'] == 'approved':
                    user_email = payment_info['response'].get('external_reference')
                    if user_email:
                        # Actualizar el estado is_premium del usuario
                        User.objects.filter(email=user_email).update(is_premium=True)
                        status = payment_info['response'].get('status')
                        transaction_amount = payment_info['response'].get('transaction_amount', 0)
                        method = payment_info['response'].get('payment_type_id', 'Desconocido')
                        user=User.objects.filter(email=user_email).first()
                        try:
                            payment = Payment(
                                user=user,
                                method=method,
                                price=transaction_amount,
                                status=status
                            )
                            payment.save()
                            print("Payment record created:", payment)
                        except IntegrityError as e:
                            print("Database integrity error:", str(e))
                            return JsonResponse({'error': 'Database integrity error', 'details': str(e)}, status=500)
                        except Exception as e:
                            print("Error saving payment:", str(e))
                            return JsonResponse({'error': 'Error saving payment', 'details': str(e)}, status=500)
                    

            return JsonResponse({'status': 'received', 'message': 'Payment processed'})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'Internal server error', 'details': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

class CreatePreferenceView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PreferenceSerializer(data=request.data)
        if serializer.is_valid():
            # Inicializa SDK de MercadoPago
            sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
            # Obtiene los datos validados y asegura que todos los decimales sean floats
            preference_data = serializer.validated_data
            for item in preference_data['items']:
                item['unit_price'] = float(item['unit_price'])
            preference_data['notification_url'] = 'https://9732-152-170-59-6.ngrok-free.app/payments/mp-notifications/'
            user = request.user.email
            preference_data['external_reference'] = user 
            preference_response = sdk.preference().create(preference_data)
            if preference_response["status"] == 201:
                return Response(preference_response["response"], status=status.HTTP_201_CREATED)
            else:
                return Response(preference_response["response"], status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentMethodsView(APIView):
    def get(self, request):
        sdk = mercadopago.SDK(settings.MERCADOPAGO_ACCESS_TOKEN)
        payment_methods_response = sdk.payment_methods().list_all()
        payment_methods = payment_methods_response.get("response", [])
        return Response(payment_methods)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAdminUser]

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
