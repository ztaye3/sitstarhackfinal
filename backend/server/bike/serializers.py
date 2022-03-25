from djoser.serializers import UserCreateSerializer
from rest_framework.serializers import ModelSerializer
from .models import Bike, TrainCapacity, NumberOfSearch


# Train capacity serializer
class TrainCapacitySerializer(ModelSerializer):
    class Meta:
        model = TrainCapacity
        fields = '__all__'


# Bike serializer
class BikeSerializer(ModelSerializer):
    class Meta:
        model = Bike
        fields = '__all__'


# NumberOfSearch serializer
class NumberOfSearchSerializer(ModelSerializer):
    class Meta:
        model = NumberOfSearch
        fields = '__all__'