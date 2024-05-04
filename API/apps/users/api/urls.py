from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.users.api.views import LoginAPI,LogoutAPI,RegisterAPI,LoggedUserViewSet,request_password_reset,IsPremium


urlpatterns=[
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', LoggedUserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'})),
    path('me/set_password/', LoggedUserViewSet.as_view({'post': 'set_password'}), name='user-set-password'),
    path('request-password-reset/', request_password_reset, name='request_password_reset'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('is_premium/', IsPremium.as_view(), name='Ispremium'),
]
