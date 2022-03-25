from rest_framework.views import APIView
from .models import ProductModel, ProductUnitModel, ProductTypeModel, ProductNameModel, ImageSliderModel
from .serializers import ProductSerializer, ProductAdminSerializer, ProductTypeSerializer, ProductUnitSerializer, ProductNameSerializer, ImageSliderSerializer
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from identity.models import *
from django.http import JsonResponse
import json
from django.core.paginator import Paginator

import string
import random


# Product code generator
def code_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


# Product view
class ProductView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    # Get all product API : api/product/v1/pn/offset, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any product exist
        try:
            queryset = ProductModel.objects.all()
        except ProductModel.DoesNotExist:
            return Response(data={'message': 'No product registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ProductAdminSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create product API : product/api/v1/, Method:POST
    def create(self, request):

        # filter data
        data = request.data

        type = data['product_type']

        unit = data['product_unit']

        productName = {
                    "en" : data['en'],
                    "de" : data['de'],
                    "ti" : data['ti'],
                    "it" : data['it'],
                    "fr" : data['fr'],
                    "am" : data['am'],
                    "ar" : data['ar']
        }


        # get current locale
        locale = data['locale']

        # Generate product code
        code = code_generator()

        # Check if the code is already exist
        product_check = ProductModel.objects.filter(code=code)

        # Keep generating new code if it already exists

        while product_check.exists():
            code = code_generator()
            product_check = ProductModel.objects.filter(code=code)

        # Append 'code' to 'product'
        data['code'] = code

        # Remove M-N relationship key
        data.pop('product_type', None)
        data.pop('product_unit', None)
        data.pop('locale', None)
        data.pop('en', None)
        data.pop('de', None)
        data.pop('it', None)
        data.pop('ti', None)
        data.pop('fr', None)
        data.pop('ar', None)
        data.pop('am', None)
        # Todo:  Estimate rate

        serializer = ProductSerializer(data=data)

        if serializer.is_valid():

            # Save product
            serializer.save()


            product_model = ProductModel.objects.get(code=code)

            try:
                get_unit = ProductUnitModel.objects.get(name=unit)
            except ProductUnitModel.DoesNotExist:
                return Response(data={'message': 'Product type does not exits'}, status=status.HTTP_204_NO_CONTENT)

            try:
                get_type = ProductTypeModel.objects.get(**{locale:type})
            except ProductTypeModel.DoesNotExist:
                return Response(data={'message': 'Product unit does not exits'}, status=status.HTTP_204_NO_CONTENT)

            try:
                name_serializer = ProductNameSerializer(data=productName)
                name_serializer.is_valid(raise_exception=True)
                name_serializer.save()

                name_id = name_serializer.data.get('id')
                get_name = ProductNameModel.objects.get(id=name_id)
            except ProductNameModel.DoesNotExist:
                return Response(data={'message': 'Product name does not exits'}, status=status.HTTP_204_NO_CONTENT)

            # Add name
            add_product_name(product_model, get_name)

            # Add unit
            add_product_unit(product_model, get_unit)
            
            # Add type
            add_product_type(product_model, get_type)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Get product API : api/product/v1/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the product is exist

        try:
            queryset = ProductModel.objects.get(id=pk)
        except ProductModel.DoesNotExist:
            return Response(data={'message': 'Product does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = ProductSerializer(queryset, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update product API : api/product/v1/'pk', Method:PUT
    def update(self, request, pk=None):

        # Check if the product exists
        try:
            queryset = ProductModel.objects.get(id=pk)
        except ProductModel.DoesNotExist:
            return Response(data={'message': 'Product does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = ProductSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete product API : api/product/v1/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the product exists
        try:
            queryset = ProductModel.objects.get(id=pk)
        except ProductModel.DoesNotExist:
            return Response(data={'message': 'ProductModel does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# Filter Products by name
class SearchProductByName(ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    # Search product API : api/product/v1/searchProduct, Method:POST
    def post(self, request, *args, **kwargs):
        product_name = request.data['name']
        locale = request.data['locale']

        # Check if any product exist
        try:
            product_field = locale + '__startswith'
            product_name = ProductNameModel.objects.filter(**{product_field: product_name})[0]
            queryset = ProductModel.objects.filter(name=product_name)
        except Exception as e:
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


# Filter Products by category
class SearchProductByCategory(ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    # Search product API : api/product/v1/searchCategory, Method:POST
    def post(self, request, *args, **kwargs):
        product_category = request.data['category']
        locale = request.data['locale']

        # Check if any product exist
        try:
            product_category = ProductTypeModel.objects.filter(**{locale: product_category})[0]
            queryset = ProductModel.objects.filter(product_type=product_category)
        except ProductModel.DoesNotExist:
            return Response(data={'message': 'No product registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


# Filter Products by rate
class SearchProductByRate(ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    # Search product API : api/product/v1/searchByRate, Method:POST
    def post(self, request, *args, **kwargs):
        product_rate = request.data['rate']
        offset = request.data['offset']
        page = request.data['page']

        # Check if any product exist
        try:
            queryset = ProductModel.objects.filter(rating_sum__gte=product_rate)
        except ProductModel.DoesNotExist:
            return Response(data={'message': 'No product registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            # Declare paginator, offset = number of content per page
            paginator = Paginator(queryset, offset)
            page = paginator.page(page)
            serializer = ProductSerializer(page, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


# Update Product rate
class UpdateProductRate(ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer

    # Update product API : api/product/v1/updateRate, Method:POST
    def post(self, request, *args, **kwargs):
        product_rate = request.data['rate']
        product_code = request.data['code']

        # Check if any product exist
        try:
            queryset = ProductModel.objects.get(code=product_code)
        except ProductModel.DoesNotExist:
            return Response(data={'message': 'No product registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            # Update rate of the product = (rating_sum + rate) / (1 + raters_sum)

            raters_sum = queryset.raters_sum + 1
            rating_sum = (float(queryset.rating_sum) + float(product_rate)) / float(raters_sum)

            # Update values
            queryset.raters_sum = raters_sum
            queryset.rating_sum = rating_sum
            queryset.save()

            serializer = ProductSerializer(queryset, many=False)

            return Response(serializer.data, status=status.HTTP_200_OK)

# Product type view
class ProductTypeView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ProductTypeModel.objects.all()
    serializer_class = ProductTypeSerializer

    # Get all product API : api/product/v1/type/pn/offset, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any product exist
        try:
            queryset = ProductTypeModel.objects.all()
        except ProductTypeModel.DoesNotExist:
            return Response(data={'message': 'No product type registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ProductTypeSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create product API: product / api / v1 /type, Method: POST
    def create(self, request):

        serializer = ProductTypeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get product API : api/product/v1/type/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the product is exist

        try:
            queryset = ProductTypeModel.objects.get(id=pk)
        except ProductTypeModel.DoesNotExist:
            return Response(data={'message': 'Product type does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = ProductTypeSerializer(queryset, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update product API : api/product/v1/type/'pk', Method:PUT
    def update(self, request, pk=None):

        # Check if the product exists
        try:
            queryset = ProductTypeModel.objects.get(id=pk)
        except ProductTypeModel.DoesNotExist:
            return Response(data={'message': 'Product type does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = ProductTypeSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete product API : api/product/v1/type/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the product exists
        try:
            queryset = ProductTypeModel.objects.get(id=pk)
        except ProductTypeModel.DoesNotExist:
            return Response(data={'message': 'Product type does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)

# Product unit view
class ProductUnitView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ProductUnitModel.objects.all()
    serializer_class = ProductUnitSerializer

    # Get all product API : api/product/v1/unit/pn/offset, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any product exist
        try:
            queryset = ProductUnitModel.objects.all()
        except ProductUnitModel.DoesNotExist:
            return Response(data={'message': 'No product unit registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ProductUnitSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create product API: product / api / v1 /unit, Method: POST
    def create(self, request):

        serializer = ProductUnitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get product API : api/product/v1/unit/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the product is exist

        try:
            queryset = ProductUnitModel.objects.get(id=pk)
        except ProductUnitModel.DoesNotExist:
            return Response(data={'message': 'Product unit does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = ProductUnitSerializer(queryset, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update product API : api/product/v1/unit/'pk', Method:PUT
    def update(self, request, pk=None):

        # Check if the product exists
        try:
            queryset = ProductUnitModel.objects.get(id=pk)
        except ProductUnitModel.DoesNotExist:
            return Response(data={'message': 'Product unit does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = ProductUnitSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete product API : api/product/v1/unit/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the product exists
        try:
            queryset = ProductUnitModel.objects.get(id=pk)
        except ProductUnitModel.DoesNotExist:
            return Response(data={'message': 'Product unit does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)

# Product name view
class ProductNameView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ProductNameModel.objects.all()
    serializer_class = ProductNameSerializer

    # Get all product API : api/product/v1/type/pn/offset, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any product exist
        try:
            queryset = ProductNameModel.objects.all()
        except ProductNameModel.DoesNotExist:
            return Response(data={'message': 'No product name registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ProductNameSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create product API: product / api / v1 /type, Method: POST
    def create(self, request):

        serializer = ProductNameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get product API : api/product/v1/type/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the product is exist

        try:
            queryset = ProductNameModel.objects.get(id=pk)
        except ProductNameModel.DoesNotExist:
            return Response(data={'message': 'Product name does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = ProductNameSerializer(queryset, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update product API : api/product/v1/type/'pk', Method:PUT
    def update(self, request, pk=None):

        # Check if the product exists
        try:
            queryset = ProductNameModel.objects.get(id=pk)
        except ProductNameModel.DoesNotExist:
            return Response(data={'message': 'Product name does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = ProductNameSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete product API : api/product/v1/type/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the product exists
        try:
            queryset = ProductNameModel.objects.get(id=pk)
        except ProductNameModel.DoesNotExist:
            return Response(data={'message': 'Product name does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# Product name view
class ImageSliderView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = ImageSliderModel.objects.all()
    serializer_class = ImageSliderSerializer

    # Get all product API : api/product/v1/type/pn/offset, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any product exist
        try:
            queryset = ImageSliderModel.objects.all()
        except ImageSliderModel.DoesNotExist:
            return Response(data={'message': 'No image registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = ImageSliderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create product API: product / api / v1 /type, Method: POST
    def create(self, request):

        serializer = ImageSliderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get product API : api/product/v1/type/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the product is exist

        try:
            queryset = ImageSliderModel.objects.get(id=pk)
        except ImageSliderModel.DoesNotExist:
            return Response(data={'message': 'image does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = ImageSliderSerializer(queryset, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update product API : api/product/v1/type/'pk', Method:PUT
    def update(self, request, pk=None):

        # Check if the product exists
        try:
            queryset = ImageSliderModel.objects.get(id=pk)
        except ImageSliderModel.DoesNotExist:
            return Response(data={'message': 'Image does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = ImageSliderSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete product API : api/product/v1/type/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the product exists
        try:
            queryset = ImageSliderModel.objects.get(id=pk)
        except ImageSliderModel.DoesNotExist:
            return Response(data={'message': 'Image does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)

# product unit
def add_product_unit(product, unit):
    product.product_unit.add(unit)

# product type
def add_product_type(product, type):
      product.product_type.add(type)

# product name
def add_product_name(product, name):
      product.name.add(name)