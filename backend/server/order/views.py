from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import OrderModel
from .serializers import OrderSerializerRead, OrderSerializerWrite, ShippingSerializer
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
# from identity.models import *
from django.http import JsonResponse
import json
from .models import OrderModel
import stripe
from product.models import ProductModel

stripe.api_key = "sk_test_51JIETXFjmXVud4GbTwREo6EqrrUz43tstEMnEvrBniCi5hVqdPclj2oRICqkcj2tsgvTxTijy79kdeKaFGIL7MIM00SlxMb5En"
from .enums import OrderStatusEnum
from django.core.mail import send_mail



@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='CHF',
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


# Order view
class OrderView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = OrderModel.objects.all()

    # Get all order API : api/order/v1/, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any order exist
        try:
            queryset = OrderModel.objects.all()
        except OrderModel.DoesNotExist:
            return Response(data={'message': 'No order registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = OrderSerializerRead(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create order API : order/api/v1/, Method:POST
    def create(self, request):

        # filter data
        data = request.data

        payment = data[0]

        order = data[1]

        products = data[2]

        shipping = data[3]

        # Stripe payment
        stripe_payment(payment)

        serializer = OrderSerializerWrite(data=order)

        if serializer.is_valid():

            # Save order
            serializer.save()

            # Add orders
            order_id = serializer.data.get('id')
            order = OrderModel.objects.get(id=order_id)

            # Update order status
            OrderModel.objects.filter(pk=order_id).update(order_status=OrderStatusEnum.PAYMENT_SUCCESSFUL)

            # Add products to order
            for code in products["products"]:
                product = ProductModel.objects.get(code=code)
                order.products.add(product)

            # Add shipping
            add_shipping(order, shipping)

            # send email
            send_order_confirmation(payment['email'], order_id)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Get order API : api/order/v1/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the order is exist

        try:
            queryset = OrderModel.objects.get(id=pk)
        except OrderModel.DoesNotExist:
            return Response(data={'message': 'Order does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = OrderSerializerRead(queryset, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update order API : api/order/v1/'pk', Method:PUT
    def update(self, request, pk=None):

        # Check if the order exists
        try:
            queryset = OrderModel.objects.get(id=pk)
        except OrderModel.DoesNotExist:
            return Response(data={'message': 'Order does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:

            # Update order status
            input_status = request.data["order_status"]

            OrderModel.objects.filter(pk=pk).update(order_status=OrderStatusEnum[input_status])

            return Response(status=status.HTTP_202_ACCEPTED)

    # Delete order API : api/order/v1/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the order exists
        try:
            queryset = OrderModel.objects.get(id=pk)
        except OrderModel.DoesNotExist:
            return Response(data={'message': 'OrderModel does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# order confirmation email sender
def send_order_confirmation(email, order_id):
    # Send mail
    send_mail(
        'Afropa order confirmation',
        'Your order number is ' + str(order_id) + ' . We will send you an update when your order has shipped ',
        email,
        [email],
        fail_silently=False,
    )


# stripe payment execution
def stripe_payment(data):
    email = data['email']
    payment_method_id = data['id']
    amount = data['amount']
    currency = data['currency']
    payment_method = data["payment_method"]

    extra_msg = ''  # add new variable to response message
    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    # if the array is empty it means the email has not been used yet
    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email, payment_method=payment_method_id)
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    # Stripe payment
    stripe.PaymentIntent.create(
        customer=customer,
        payment_method_types=payment_method,
        payment_method=payment_method_id,
        currency=currency,
        amount=amount,
        confirm=True)

def add_shipping(order, shipping):

    serializer = ShippingSerializer(data = shipping)

    if serializer.is_valid():
        # Save shipping
        serializer.save()
        shipping_id = serializer.data.get('id')
        order.shipping.add(shipping_id)