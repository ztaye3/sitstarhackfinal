# Generated by Django 3.2.4 on 2021-08-04 08:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('identity', '0009_auto_20210802_1406'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='username',
        ),
    ]