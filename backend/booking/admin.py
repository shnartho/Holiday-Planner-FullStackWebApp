from django.contrib import admin

from .models import *


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
	list_display = [field.name for field in Booking._meta.fields]

