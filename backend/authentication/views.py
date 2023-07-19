import random

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from drf_spectacular.utils import OpenApiParameter, extend_schema

from authentication.serializers import UserSerializer, UserListSerializer

from commons.pagination import Pagination
from commons.utils import get_paginated_response



# Create your views here.
User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
	def validate(self, attrs):
		data = super().validate(attrs)
		user = {}

		serializer_data = UserListSerializer(self.user).data

		for k, v in serializer_data.items():
			user[k] = v
		data['user'] = user
		return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserCreateAPIView(APIView):
	@extend_schema(request=UserSerializer,responses=UserListSerializer)
	def post(self, request, format=None):
		restricted_values = ['', ' ', 0, '0', 'undefined', 'null', 'None']
		filtered_data = {}
		for key, value in request.data.items():
			if value not in restricted_values:
				filtered_data[key] = value
		serializer = UserSerializer(data=filtered_data)
		if serializer.is_valid():
			serializer.save()
		else:
			return Response({'errors': serializer.errors, 'message': "Signup failed!"}, status=status.HTTP_400_BAD_REQUEST)
		return Response({'data': serializer.data, 'message': "Signup successfull!"}, status=status.HTTP_201_CREATED)


class UserListAPIView(APIView):
	permission_classes = [IsAuthenticated]

	@extend_schema(request=UserSerializer, responses=UserListSerializer,
		tags=['authentication/user'], parameters=[OpenApiParameter('page'), OpenApiParameter('size')])
	# @permission_classes([IsAuthenticated])
	def get(self, request, format=None):
		users = User.objects.all()
		if request.query_params.get('wp'):
			serializer = UserListSerializer(users, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			response = get_paginated_response(request, users, UserListSerializer)
			return Response(response, status=status.HTTP_200_OK)


class UserRetrieveUpdateDestroyAPIView(APIView):
	permission_classes = [IsAuthenticated]

	@extend_schema(request=UserSerializer,responses=UserListSerializer,
		tags=['authentication/user'], operation_id='user_by_id')
	def get(self, request, pk, format=None):
		try:
			user = User.objects.get(pk=pk)
			serializer = UserListSerializer(user)
			return Response({'data': serializer.data}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'message': "Requested user doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)

	@extend_schema(request=UserSerializer,responses=UserListSerializer,
		tags=['authentication/user'])
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
			user = User.objects.get(pk=pk)
			serializer = UserSerializer(user, data=filtered_data)
			if serializer.is_valid():
				serializer.save()
			else:
				return Response({'errors': serializer.errors, 'message': "User update failed"}, status=status.HTTP_400_BAD_REQUEST)
			return Response({'data': serializer.data, 'message': "User updated successfully"}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'message': "Requested user doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


	@extend_schema(request=UserSerializer,responses=UserListSerializer,
		tags=['authentication/user'])
	def delete(self, request, pk, format=None):
		try:
			user = User.objects.get(pk=pk)
			user.delete()
			return Response({'message': "User deleted successfully"}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'message': "Requested user doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def logout(request):
	return Response({'message': f"Successfully logged out"}, status=status.HTTP_200_OK)



@extend_schema(request=UserSerializer, responses=UserSerializer)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_myself_user(request):
	try:
		user = request.user
		serializer = UserListSerializer(user)
		return Response(serializer.data, status=status.HTTP_200_OK)
	except ObjectDoesNotExist:
		return Response({'message': f"User doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)

