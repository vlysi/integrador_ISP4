from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet,PaymentMethodsView

router = DefaultRouter()
router.register('payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
    path('payment-methods/', PaymentMethodsView.as_view(), name='payment-methods'),
]
