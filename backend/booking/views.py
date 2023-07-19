from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import OpenApiParameter, extend_schema

from commons.pagination import Pagination
from commons.utils import get_paginated_response

from .models import Booking
from .serializers import BookingSerializer, BookingListSerializer

from datetime import datetime

class BookingListCreateAPIView(APIView):
	permission_classes = [IsAuthenticated]

	@extend_schema(request=BookingSerializer, responses=BookingListSerializer,
		tags=['booking/booking'], parameters=[OpenApiParameter('page'), OpenApiParameter('size')])
	# @permission_classes([IsAuthenticated])
	def post(self, request, format=None):
		data = request.data
		start_date = data.get('start_date', '')
		end_date = data.get('end_date', '')
		if start_date >= str(datetime.now().date()):
			if start_date <= end_date:
				bookings = Booking.objects.filter(Q(start_date__gte=start_date, start_date__lte=end_date) | Q(end_date__gte=start_date, end_date__lte=end_date) | Q(start_date__gte=start_date, end_date__lte=end_date))
				if bookings.count() < 3:
					serializer = BookingSerializer(data=data)
					if serializer.is_valid():
						serializer.save()
					else:
						return Response({'errors': serializer.errors, 'message': "Booking failed!"}, status=status.HTTP_400_BAD_REQUEST)
					return Response({'data': serializer.data, 'message': "Booking successfull!"}, status=status.HTTP_201_CREATED)
				else:
					return Response({'message': "Booking creation failed! Already 3 people are in this time slot"}, status=status.HTTP_400_BAD_REQUEST)
			else:
				return Response({'message': "Start date can't be greater than end date"}, status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({'message': "Start date must be greater or equal to current date"}, status=status.HTTP_400_BAD_REQUEST)

	@extend_schema(request=BookingSerializer, responses=BookingListSerializer,
		tags=['booking/booking'], parameters=[OpenApiParameter('page'), OpenApiParameter('size')])
	# @permission_classes([IsAuthenticated])
	def get(self, request, format=None):
		users = Booking.objects.all()
		if request.query_params.get('wp'):
			serializer = BookingListSerializer(users, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			response = get_paginated_response(request, users, BookingListSerializer)
			return Response(response, status=status.HTTP_200_OK)


class BookingRetrieveUpdateDestroyAPIView(APIView):
	permission_classes = [IsAuthenticated]

	@extend_schema(request=BookingSerializer,responses=BookingListSerializer,
		tags=['booking/booking'], operation_id='booking_by_id')
	def get(self, request, pk, format=None):
		try:
			user = Booking.objects.get(pk=pk)
			serializer = BookingListSerializer(user)
			return Response({'data': serializer.data}, status=status.HTTP_200_OK)
		except Booking.DoesNotExist:
			return Response({'message': "Requested booking doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

	@extend_schema(request=BookingSerializer,responses=BookingListSerializer,
		tags=['booking/booking'])
	def put(self, request, pk, format=None):
		restricted_values = ['', ' ', 0, '0', 'undefined', 'null', 'None']
		filtered_data = {}
		for key, value in request.data.items():
			if value not in restricted_values:
				filtered_data[key] = value
		image = filtered_data.get('image')
		if type(image) == str:
			filtered_data.pop('image')
		filtered_data.pop('password')
		try:
			user = Booking.objects.get(pk=pk)
			serializer = BookingSerializer(user, data=filtered_data)
			if serializer.is_valid():
				serializer.save()
			else:
				return Response({'errors': serializer.errors, 'message': "Booking update failed"}, status=status.HTTP_400_BAD_REQUEST)
			return Response({'data': serializer.data, 'message': "Booking updated successfully"}, status=status.HTTP_200_OK)
		except Booking.DoesNotExist:
			return Response({'message': "Requested booking doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

	@extend_schema(request=BookingSerializer,responses=BookingListSerializer,
		tags=['booking/booking'])
	def delete(self, request, pk, format=None):
		try:
			user = Booking.objects.get(pk=pk)
			user.delete()
			return Response({'message': "Booking deleted successfully"}, status=status.HTTP_200_OK)
		except Booking.DoesNotExist:
			return Response({'message': "Requested booking doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)





