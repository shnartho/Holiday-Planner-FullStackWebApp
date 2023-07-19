from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import AnonymousUser

from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import BasePermission



class IsAdminUser(BasePermission):
	""" Allows access only to admin users """
	def has_permission(self, request, view):
		return bool(request.user.is_authenticated and request.user.is_admin)




def is_adminuser(view_func):
	def wrapper(request, *args, **kwargs):
		print('request.user: ', request.user)
		print('args: ', args)
		print('kwargs: ', kwargs)
		if request.user.is_admin == True:
			return view_func(request, *args, **kwargs)
		else:
			return Response({'detail': f"Only admin can perform this operation."}, status=status.HTTP_403_FORBIDDEN)
	return wrapper




