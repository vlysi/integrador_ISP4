# Generated by Django 4.2.1 on 2024-05-09 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newsletter', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newsletter',
            name='email',
            field=models.EmailField(error_messages={'unique': 'La dirección proporcionada ya se encuentra subscripta.'}, max_length=254, unique=True),
        ),
    ]
