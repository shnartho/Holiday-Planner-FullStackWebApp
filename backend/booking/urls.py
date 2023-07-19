from . import views as views
from django.urls import path


urlpatterns = [
	path('api/v1/booking/', views.BookingListCreateAPIView.as_view(), name='booking'),
	path('api/v1/booking/<int:pk>', views.BookingRetrieveUpdateDestroyAPIView.as_view(), name='booking'),
]
