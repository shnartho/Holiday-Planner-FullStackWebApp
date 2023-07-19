from rest_framework import serializers

from django_currentuser.middleware import get_current_authenticated_user

from authentication.models import User


class UserMiniSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'name', 'email', 'username']



class UserListSerializer(serializers.ModelSerializer):
	created_by = UserMiniSerializer()
	updated_by = UserMiniSerializer()

	class Meta:
		model = User
		exclude = ['password']
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




class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'
		extra_kwargs = {
			'password': {
				'write_only': True,
				'required': False,
			},
			'is_active': {
				'write_only': True,
				'required': False,
			},
			'is_admin': {
				'write_only': True,
				'required': False,
			},
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

	def create(self, validated_data):
		modelObject = super().create(validated_data=validated_data)
		modelObject.set_password(validated_data["password"])
		user = get_current_authenticated_user()
		if user is not None:
			modelObject.created_by = user
		modelObject.save()
		return modelObject
	
	def update(self, instance, validated_data):
		modelObject = super().update(instance=instance, validated_data=validated_data)
		user = get_current_authenticated_user()
		if user is not None:
			modelObject.updated_by = user
		modelObject.save()
		return modelObject




class PasswordChangeSerializer(serializers.Serializer):
	password = serializers.CharField(max_length=64)
	confirm_password = serializers.CharField(max_length=64)
