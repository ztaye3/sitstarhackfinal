from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from .models import MerchantModel

# Get user model
User = get_user_model()


# Merchant serializer for read only
class MerchantSerializerRead(ModelSerializer):
    class Meta:
        model = MerchantModel
        fields = ('identification',)
        depth = 0


# User serializer
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password',
                  'profile_picture', 'is_merchant', 'is_customer', 'is_staff', 'is_active', 'is_activated',
                  'is_admin', 'updated_by', 'created_by'
                  )


# User serializer
class UserAdminSerializer(ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_admin',
                  'is_merchant', 'is_customer', 'is_staff', 'is_active', 'is_activated', 'profile_picture'
                  )


# User serializer
class UserAdminUpdateSerializer(ModelSerializer):
    user_merchant = MerchantSerializerRead(many=True)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_admin',
                  'is_merchant', 'is_customer', 'is_staff', 'is_active', 'is_activated', 'user_merchant'
                  )
        depth = 1


# Update profile serializer
class UpdateUserProfileSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'is_merchant', 'is_customer', 'profile_picture')


# Merchant serializer for write
class MerchantSerializerWrite(ModelSerializer):
    class Meta:
        model = MerchantModel
        fields = '__all__'

        extra_kwargs = {'merchant': {"required": False}}
