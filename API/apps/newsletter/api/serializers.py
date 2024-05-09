from rest_framework.serializers import ModelSerializer
from apps.newsletter.models import Newsletter

class NewsletterSerializer(ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'
        read_only_fields = ('created_at',)
