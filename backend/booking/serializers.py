from rest_framework import serializers

from authentication.serializers import UserMiniSerializer
from .models import Booking



class BookingListSerializer(serializers.ModelSerializer):
	user = UserMiniSerializer()
	created_by = UserMiniSerializer()
	updated_by = UserMiniSerializer()

	class Meta:
		model = Booking
		fields = '__all__'
		extra_kwargs = {
			'created_at':{
				'read_only': True,
			},
			'updated_at':{
				'read_only': True,
			},
			'created_by':{
				'read_only': True,
			},
			'updated_by':{
				'read_only': True,
			},
		}




class BookingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Booking
		fields = '__all__'
		extra_kwargs = {
			'created_at':{
				'read_only': True,
			},
			'updated_at':{
				'read_only': True,
			},
			'created_by':{
				'read_only': True,
			},
			'updated_by':{
				'read_only': True,
			},
		}
