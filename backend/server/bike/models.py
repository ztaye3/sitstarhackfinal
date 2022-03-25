from django.db import models
import os
import sys
from django.utils import timezone


class Bike(models.Model):
    """Model For The Bike"""

    departure = models.CharField(max_length=200, default='null', null=True)
    arrival = models.CharField(max_length=200, default='null', null=True)
    departure_date = models.CharField(max_length=200, default='null', null=True)
    arrival_date = models.CharField(max_length=200, default='null', null=True)
    train_number = models.CharField(max_length=200, default='null', null=True)


class TrainCapacity(models.Model):
    """Model For The train capacity"""

    train_number = models.CharField(max_length=200, default='null', null=True)
    capacity = models.IntegerField(default=0, null=True)


class NumberOfSearch(models.Model):
    """Model For The number of search"""

    departure = models.CharField(max_length=200, default='null', null=True)
    arrival = models.CharField(max_length=200, default='null', null=True)
    departure_date = models.CharField(max_length=200, default='null', null=True)
    arrival_date = models.CharField(max_length=200, default='null', null=True)
    train_number = models.CharField(max_length=200, default='null', null=True)
    number_of_search = models.IntegerField(default=0)