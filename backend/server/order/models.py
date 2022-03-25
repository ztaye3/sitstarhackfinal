from django.db import models
import os
import sys
from django.utils import timezone
from product.models import ProductModel
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import JSONField
from enumchoicefield import ChoiceEnum, EnumChoiceField
from .enums import OrderStatusEnum

# Shipping model
class ShippingModel(models.Model):
    email = models.EmailField(max_length=255, null=True, default="unknown")
    first_name = models.CharField(max_length=2000, blank=True, null=True, default="")
    last_name = models.CharField(max_length=2000, blank=True, null=True, default="")
    address = models.CharField(max_length=2000, blank=True, null=True, default="")
    zip_code = models.CharField(max_length=2000, blank=True, null=True, default="")
    phone = models.CharField(max_length=2000, blank=True, null=True, default="")
    country = models.CharField(max_length=2000, blank=True, null=True, default="")
    state = models.CharField(max_length=2000, blank=True, null=True, default="")
    city = models.CharField(max_length=2000, blank=True, null=True, default="")
    apartment = models.CharField(max_length=2000, blank=True, null=True, default="")

# Order model
class OrderModel(models.Model):
    email = models.EmailField(max_length=255, null=True, default="unknown")
    total_cost = models.FloatField(blank=True, null=True, default=0.0)
    description = models.CharField(max_length=1000, blank=True, null=True, default="")
    amount = models.CharField(max_length=2000, blank=True, null=True, default="")
    products = models.ManyToManyField(ProductModel, related_name='order', default='', blank=True)
    payment_method = models.CharField(default='Card', null=True, max_length=280)
    updated_by = models.CharField(max_length=200, default='System', null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.CharField(default='System', null=True, max_length=280)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    order_status = EnumChoiceField(enum_class=OrderStatusEnum, default=OrderStatusEnum.UNKNOWN)
    shipping = models.ManyToManyField(ShippingModel, related_name='order', default='', blank=True)
