from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from commons.models import TimeStampMixin




class UserManager(BaseUserManager):
	def create_user(self, name, email, password=None):
		if not email:
			raise ValueError('Users must have an email address')

		user = self.model(
			name = name,
			email=self.normalize_email(email),
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, name, email, password=None):
		user = self.create_user(
			name = name,
			email= email,
			password=password,
		)
		user.is_admin = True
		user.save(using=self._db)
		return user
 



class User(AbstractBaseUser, TimeStampMixin):

	name = models.CharField(max_length=100)
	email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
	username = models.CharField(max_length=100, null=True, blank=True, unique=True)

	mobile = models.CharField(max_length=50, null=True, blank=True)

	date_of_birth = models.DateField(null=True, blank=True)

	is_active = models.BooleanField(default=True)
	is_admin = models.BooleanField(default=False)

	address = models.TextField(null=True, blank=True)

	image = models.ImageField(upload_to='user/', null=True, blank=True)

	objects = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['name',]

	class Meta:
		ordering = ('-id',)

	def __str__(self):
		return self.email

	def has_perm(self, perm, obj=None):
		"Does the user have a specific permission?"
		# Simplest possible answer: Yes, always
		return True

	def has_module_perms(self, app_label):
		"Does the user have permissions to view the app `app_label`?"
		# Simplest possible answer: Yes, always
		return True

	@property
	def is_staff(self):
		"Is the user a member of staff?"
		# Simplest possible answer: All admins are staff
		return self.is_admin



