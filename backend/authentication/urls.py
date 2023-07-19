from . import views as views
from django.urls import path


urlpatterns = [

	path('api/v1/user/signup/', views.UserCreateAPIView.as_view(), name='signup'),

	path('api/v1/user/login/', views.MyTokenObtainPairView.as_view(), name='login'),

	path('api/v1/user/logout/', views.logout, name='logout'),

	path('api/v1/user/', views.UserListAPIView.as_view(), name='user'),

	path('api/v1/user/<int:pk>', views.UserRetrieveUpdateDestroyAPIView.as_view(), name='user'),

	path('api/v1/user/myself_data/', views.get_myself_user, name='myself_data'),

]
