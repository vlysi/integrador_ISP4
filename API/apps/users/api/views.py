from django.core.mail import send_mail
import string
import secrets
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework import viewsets, permissions, status, generics, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from apps.users.models import User
from apps.users.api.serializers import (
    UserSerializer,  LoginSerializer,
    PasswordSerializer, RegisterUserSerializer,
    LogoutSerializer,isPremiumSerializer
)
from core import settings


class LoggedUserViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    @action(detail=False, methods=['post'])
    def set_password(self, request):
        user = request.user
        password_serializer = PasswordSerializer(
            data=request.data, context={'request': request})

        if password_serializer.is_valid():
            new_password = password_serializer.validated_data['new_password']
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Contraseña actualizada correctamente'})

        return Response({'message': 'Hay errores en la información enviada', 'errors': password_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Obtener email y contraseña validados
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            # Autenticar al usuario usando el email y la contraseña
            user = authenticate(request, username=email, password=password) # type: ignore
            if user is not None:
                user.last_login = timezone.now()
                user.save()
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Usuario logueado con éxito',
                    'user': UserSerializer(user, context=self.get_serializer_context()).data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                    }, status=status.HTTP_200_OK)
        # Si la autenticación falla o la validación del serializador falla, devolver los errores del serializador
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class IsPremium(generics.GenericAPIView):
    serializer_class = isPremiumSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            key=serializer.validated_data['key']
            email = serializer.validated_data['email']
            if key== settings.ANDROID_KEY:
                try:
                    user = User.objects.get(email=email)
                    # Devuelve el estado is_premium del usuario
                    return Response({
                        'message': 'Usuario registrado',
                        'is_premium': user.is_premium
                        },status=status.HTTP_200_OK)
                except User.DoesNotExist:
                    # Si el usuario no existe, devuelve False
                    return Response({
                        'message': 'El usuario no existe',
                        'is_premium': False
                        },status=status.HTTP_200_OK)
            else:
                return Response({
                    'message': 'Acceso denegado'
                    },status=status.HTTP_403_FORBIDDEN)
        else:
            # Si los datos no son válidos, devuelve un error 400 con los errores del serializador
            return Response({'message': 'Hay errores en la información enviada', 'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPI(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh_token = serializer.validated_data.get("refresh")

            if not refresh_token:
                return Response({
                    'message': 'No se proporcionó token de actualización'
                    }, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({
                'message': 'Sesión cerrada con éxito'
                }, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({
                'message': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterUserSerializer

    def post(self, request):
        email = request.data.get('email')
        # Verificar si ya existe un usuario con ese email
        if User.objects.filter(email=email).exists():
            return Response({
                'message': 'Ya existe un usuario con ese email'
                }, status=status.HTTP_400_BAD_REQUEST)
        # Procesar la creación del usuario
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'Usuario creado con éxito',
                'user': UserSerializer(user, context=self.get_serializer_context()).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([])
def request_password_reset(request):
    UserModel = get_user_model()
    email = request.data.get('email')
    user = UserModel.objects.filter(email=email).first()

    if user:
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk)) 
        password = ''.join(secrets.choice(
            string.ascii_letters + string.digits) for i in range(10))
        user.set_password(password)
        user.save()

        send_mail(
            'Restablecimiento de Contraseña-NO RESPONDER',
            f'Esta es tu nueva contraseña: {password}',
            'no-reply@passkeeper.com',
            [user.email],
            fail_silently=False,
        )
        return Response({
            'message': 'Se ha enviado un email para restablecer tu contraseña.'
            }, status=status.HTTP_200_OK)

    return Response({
        'message': 'No se encontró un usuario con ese email.'
        }, status=status.HTTP_400_BAD_REQUEST)
