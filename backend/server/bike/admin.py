from django.contrib import admin

from .models import Bike, TrainCapacity

# Register your models here.
admin.site.register(Bike)
admin.site.register(TrainCapacity)