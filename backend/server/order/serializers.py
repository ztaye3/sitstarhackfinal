from product.models import ProductModel
from rest_framework.serializers import ModelSerializer
from .models import OrderModel, ShippingModel

# Shipping serializer
class ShippingSerializer(ModelSerializer):
    class Meta:
        model = ShippingModel
        fields = '__all__'

# Product serializer
class ProductSerializer(ModelSerializer):
    class Meta:
        model = ProductModel
        fields = '__all__'


# Order serializer for read only
class OrderSerializerRead(ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = OrderModel
        fields = '__all__'
        depth = 1


# Order serializer for write
class OrderSerializerWrite(ModelSerializer):

    class Meta:
        model = OrderModel
        fields = '__all__'
        extra_kwargs = {'products': {"required": False},'shipping': {"required": False}, 'order_status': {"required": False}}

