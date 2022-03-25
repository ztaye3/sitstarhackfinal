from django.shortcuts import render
from .serializers import BikeSerializer
from .models import TrainCapacity, Bike, NumberOfSearch
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings


# Create your views here.
# Bike  view
class BikeView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer(many=True)

    # check booking
    def create(self, request):

        # filter data
        data = request.data

        # check realtime data
        try:

            # check if it's a departure time
            if data['is_departure']:

                # filter by departure date
                queryset = Bike.objects.filter(departure_date=data['selectedDate'], departure=data['from'],
                                               arrival=data['to'])

            else:
                # filter by arrival date
                queryset = Bike.objects.filter(arrival_date=data['selectedDate'], departure=data['from'],
                                               arrival=data['to'])

        except Bike.DoesNotExist:
            # Todo: recommend next trains
            return Response(data={'message': 'Bike does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:

            # return number of spaces
            train_number = queryset[0].train_number
            number_of_booking = queryset.count()
            train_capacity_object = TrainCapacity.objects.filter(train_number=train_number)[0]
            train_capacity = train_capacity_object.capacity
            number_of_free_space = int(train_capacity) - int(number_of_booking)

            # check number of search
            if data['is_departure']:

                number_of_search, created = NumberOfSearch.objects.get_or_create(departure_date=data['selectedDate'],
                                                                                 departure=data['from'],
                                                                                 arrival=data['to'], train_number=train_number)

            else:
                number_of_search, created = NumberOfSearch.objects.get_or_create(arrival_date=data['selectedDate'],
                                                                                 departure=data['from'],
                                                                                 arrival=data['to'], train_number=train_number)

            # increment number of fields
            search = number_of_search.number_of_search
            number_of_search.number_of_search = number_of_search.number_of_search + 1

            number_of_search.save()

            # check if the max capacity limit reached
            if number_of_free_space != 0:
                data = {'train_number': train_number, 'free_space': number_of_free_space, 'number_of_search': search+1,
                        'is_departure': data['is_departure'], 'selectedDate':  data['selectedDate'], 'from': data['from']
                        , 'to': data['to']}
                return Response(data, status=status.HTTP_201_CREATED)
            else:
                # Todo: recommend next trains
                data = {'train_number': train_number, 'free_space': number_of_free_space,'number_of_search': search+1}
                return Response(data, status=status.HTTP_201_CREATED)

    # Check booking
    def list(self, request, page=None, offset=None):

        # Check if any cv exist
        try:
            queryset = Bike.objects.filter()
        except Bike.DoesNotExist:
            return Response(data={'message': 'No cv registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = BikeSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Check booking
    def retrieve(self, request, pk=None):
        # Check if the cv is exist
        try:

            queryset = Bike.objects.filter(id=pk)

        except Bike.DoesNotExist:
            return Response(data={'message': 'Bike does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = BikeSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Check booking
    def update(self, request, pk=None):

        # Check if the cv exists
        try:
            queryset = Bike.objects.get(id=pk)
        except Bike.DoesNotExist:
            return Response(data={'message': 'Bike does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = BikeSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    #
    def destroy(self, request, pk=None):
        # Check if the category exists
        try:
            queryset = Bike.objects.get(id=pk)
        except Bike.DoesNotExist:
            return Response(data={'message': 'Bike does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()


class BookView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer(many=True)

    def create(self, request):
        # filter data
        input = request.data
        if input['is_departure']:
            trip = 'departure_date'
        else:
            trip = 'arrival_date'
        data = {
            "departure": input['departure'],
            "arrival": input['arrival'],
            trip: input['selectedDate'],
            'train_number': input['train_number']
        }

        reserve = input['reserve']

        # register reserves
        for i in range(int(reserve)):
            serializer = BikeSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        return Response(data, status=status.HTTP_201_CREATED)