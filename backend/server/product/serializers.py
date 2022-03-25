from rest_framework import serializers
from .models import ProductModel, ProductTypeModel, ProductUnitModel, ProductNameModel, ImageSliderModel
from .enums import ProductStatusEnum, ProductTypeEnum, ProductUnitEnum
from identity.serializers import *
from enumchoicefield import ChoiceEnum, EnumChoiceField
from identity.models import UserAccount


# image slider serializer
class ImageSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageSliderModel
        fields = '__all__'

# product type serializer
class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTypeModel
        fields = '__all__'


# product uint serializer
class ProductUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductUnitModel
        fields = '__all__'


# product uint serializer
class ProductNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductNameModel
        fields = '__all__'
# User serializer for product model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'


# Product serializer
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductModel

        fields = ( 'description', 'product_status', 'market_price',
                  'customer_price', 'rating_sum', 'code', 'image', 'updated_by', 'created_by', 'name', 'product_type')
        extra_kwargs = {
                        'product_status': {"required": False, "allow_null": True},
                        }
        depth = 1


# Product serializer for readonly
class ProductAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel

        fields = ('id', 'name', 'description', 'product_type', 'product_status', 'market_price',
                  'customer_price', 'rating_sum', 'code', 'image', 'product_unit')

        extra_kwargs = {'product_type': {"required": False, "allow_null": True},
                        'product_status': {"required": False, "allow_null": True},
                        'product_unit': {"required": False, "allow_null": True},
                        'name': {"required": False, "allow_null": True}}
        depth = 1
