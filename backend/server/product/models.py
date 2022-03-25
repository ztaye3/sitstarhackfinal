from django.db import models
from .enums import ProductStatusEnum, ProductTypeEnum, ProductUnitEnum
import os
import sys
from django.utils import timezone
from enumchoicefield import ChoiceEnum, EnumChoiceField
from identity.models import UserAccount


# Image upload
def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"product_images/{instance.code}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


# Image upload
def upload_slider_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"slider_images/{instance.id}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

# Product unit model
class ImageSliderModel(models.Model):
    image = models.ImageField(upload_to=upload_slider_to, blank=True, null=True, default="")

# Product type model
class ProductTypeModel(models.Model):
    en = models.CharField(max_length=1000, blank=True, null=True, default="")
    de = models.CharField(max_length=1000, blank=True, null=True, default="")
    fr = models.CharField(max_length=1000, blank=True, null=True, default="")
    it = models.CharField(max_length=1000, blank=True, null=True, default="")
    ar = models.CharField(max_length=1000, blank=True, null=True, default="")
    am = models.CharField(max_length=1000, blank=True, null=True, default="")
    ti = models.CharField(max_length=1000, blank=True, null=True, default="")


# Product unit model
class ProductUnitModel(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True, default="")


# Product name model
class ProductNameModel(models.Model):
    en = models.CharField(max_length=1000, blank=True, null=True, default="")
    de = models.CharField(max_length=1000, blank=True, null=True, default="")
    fr = models.CharField(max_length=1000, blank=True, null=True, default="")
    it = models.CharField(max_length=1000, blank=True, null=True, default="")
    ar = models.CharField(max_length=1000, blank=True, null=True, default="")
    am = models.CharField(max_length=1000, blank=True, null=True, default="")
    ti = models.CharField(max_length=1000, blank=True, null=True, default="")


# Product model
class ProductModel(models.Model):
    name = models.ManyToManyField(ProductNameModel, related_name='product', default='', blank=True)
    description = models.CharField(max_length=1000, blank=True, null=True, default="")
    image = models.ImageField(upload_to=upload_to, blank=True, null=True, default="")
    updated_by = models.CharField(max_length=200, default='System', null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.CharField(default='System', null=True, max_length=280)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    product_type = models.ManyToManyField(ProductTypeModel, related_name='product', default='', blank=True)
    product_status = EnumChoiceField(enum_class=ProductStatusEnum, default=ProductStatusEnum.AVAILABLE)
    market_price = models.FloatField(blank=True, null=True, default=0.0)
    customer_price = models.FloatField(blank=True, null=True, default=0.0)
    rating_sum = models.FloatField(blank=True, null=True, default=0.0)
    raters_sum = models.BigIntegerField(blank=True, null=True, default=0.0)
    code = models.CharField(max_length=200, unique=True)
    product_unit = models.ManyToManyField(ProductUnitModel, related_name='product', default='', blank=True)
