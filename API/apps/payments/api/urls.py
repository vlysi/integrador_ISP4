from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet,PaymentMethodsView,CreatePreferenceView,payment_notification

router = DefaultRouter()
router.register('payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('', include(router.urls)),
    path('payment-methods/', PaymentMethodsView.as_view(), name='payment-methods'),
    path('create_preference/', CreatePreferenceView.as_view(), name='create_preference'),
    path('mp-notifications/', payment_notification, name='mp-notifications'),
]
