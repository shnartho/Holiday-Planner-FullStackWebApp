from django.conf import settings
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.views.static import serve

from drf_spectacular.views import (SpectacularSwaggerView, SpectacularAPIView, SpectacularRedocView)

from .views import home, not_found_view


urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('authentication/', include('authentication.urls')),
    path('booking/', include('booking.urls')),

    # swagger-documentation
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),

    # re_path(r'^.*$', not_found_view, name='not_found'),
]
