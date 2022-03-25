# Generated by Django 3.2.4 on 2022-03-25 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('departure', models.CharField(default='null', max_length=200, null=True)),
                ('arrival', models.CharField(default='null', max_length=200, null=True)),
                ('departure_date', models.CharField(default='null', max_length=200, null=True)),
                ('arrival_date', models.CharField(default='null', max_length=200, null=True)),
                ('train_number', models.CharField(default='null', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='NumberOfSearch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('departure', models.CharField(default='null', max_length=200, null=True)),
                ('arrival', models.CharField(default='null', max_length=200, null=True)),
                ('departure_date', models.CharField(default='null', max_length=200, null=True)),
                ('arrival_date', models.CharField(default='null', max_length=200, null=True)),
                ('train_number', models.CharField(default='null', max_length=200, null=True)),
                ('number_of_search', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='TrainCapacity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('train_number', models.CharField(default='null', max_length=200, null=True)),
                ('capacity', models.IntegerField(default=0, null=True)),
            ],
        ),
    ]