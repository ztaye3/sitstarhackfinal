from django.shortcuts import render
from .serializers import BikeSerializer
from .models import TrainCapacity, Bike, NumberOfSearch
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

import datetime
import requests
import pandas as pd
import joblib
import json
import time
import os
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
            # predict likelihood
            module_dir = os.path.dirname(__file__)
            file_path = os.path.join(module_dir, 'submission_model.sav')
            lr = joblib.load(file_path)
            print('Model loaded')
            file_path = os.path.join(module_dir, 'submission_model_columns.sav')
            model_columns = joblib.load(file_path)
            print('Model columns loaded')
            file_path = os.path.join(module_dir, 'submission_testing_api.csv')
            query = pd.read_csv(file_path)

            from_place = "Glarus"
            to_place = "St. Gallen"
            time_start = time.time() * 1000
            time_start = str(int(time_start))
            departure = "true"

            headers = {'API-Key': 'V00132999D39-2365-4793-89C7-41B155C72876'}
            data_whether = requests.get(
                "https://free.viapi.ch/v1/connection?from=" + from_place + "&to=" + to_place + "&time=" + time_start + "&departure=" + departure + "&apiKeyWeb=V00132999D39-2365-4793-89C7-41B155C72876",
                headers=headers)
            try:
                data_json = json.loads(data_whether.text)
                connections = data_json['connections']
                connection_1 = connections[0]

                lat = str(connection_1['from']['location']['latitude'])
                lon = str(connection_1['from']['location']['longitude'])
            except:
                lat = str(47.376888)
                lon = str(8.541694)
            daily_weather_data = requests.get(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&units=metric&appid=5df33fecd79f38e1e962212b0b677643')

            data_json_weather = json.loads(daily_weather_data.text)
            temperature = data_json_weather['current']['temp']
            clouds = data_json_weather['current']['clouds']
            precipitation = data_json_weather['current']['dew_point']

            query["t_2m"] = temperature
            query["precip_24h"] = precipitation
            query["effective_cloud_cover"] = clouds

            date_time_obj = datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S')
            date_time_obj2 = datetime.datetime.strptime(date_time_obj, '%Y-%m-%d %H:%M:%S')
            try:
                depart_time_obj = datetime.datetime.strptime(data['selectedDate'], '%Y-%m-%d %H:%M:%S')
                arrival_time_obj = datetime.datetime.strptime(data['selectedDate'], '%Y-%m-%d %H:%M:%S')
            except:
                depart_time_obj = datetime.datetime.strptime(date_time_obj, '%Y-%m-%d %H:%M:%S')
                arrival_time_obj = datetime.datetime.strptime(date_time_obj, '%Y-%m-%d %H:%M:%S')

            hours_conv = abs(datetime.datetime(date_time_obj2.year, 1, 1) - date_time_obj2).total_seconds() / 3600.0
            departure_hours_conv = abs(
                datetime.datetime(depart_time_obj.year, 1, 1) - depart_time_obj).total_seconds() / 3600.0
            arrival_hours_conv = abs(
                datetime.datetime(arrival_time_obj.year, 1, 1) - arrival_time_obj).total_seconds() / 3600.0

            query["res_dt"] = hours_conv
            query["train_nr"] = train_number
            query["dep_ist"] = departure_hours_conv
            query["arr_ist"] = arrival_hours_conv

            prediction = list(lr.predict(query))[0]
            msg = "There is a high probability that the chosen date will have free spaces"

            if prediction == 0:
                msg = "There is a high probability that the chosen date won't have free spaces"
            print(msg)
            # body = {
            #     "reserv_date": datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S'),
            #     "departure_date": data['selectedDate'],
            #     "arrival_date": data['selectedDate'],
            #     "train_nr": train_number
            # }
            # prediction_request = requests.post("http://127.0.0.1:5000", data=body)
            # print(list(prediction_request.text)[0])
            # check if the max capacity limit reached
            if number_of_free_space != 0:
                data = {'train_number': train_number, 'free_space': number_of_free_space, 'number_of_search': search+1,
                        'is_departure': data['is_departure'], 'selectedDate':  data['selectedDate'], 'from': data['from']
                        , 'to': data['to'], 'probability': msg}
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