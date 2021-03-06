# Generated by Django 3.2.4 on 2021-08-01 22:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('identity', '0006_auto_20210726_1430'),
    ]

    operations = [
        migrations.CreateModel(
            name='MerchantModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identification', models.CharField(blank=True, default='', max_length=1000)),
                ('merchant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
