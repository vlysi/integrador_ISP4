from apps.newsletter.models import Newsletter
from .serializers import NewsletterSerializer
from rest_framework import  permissions, viewsets

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = NewsletterSerializer
