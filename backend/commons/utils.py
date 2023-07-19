from .pagination import Pagination, validate_page_size

from django.db.models import QuerySet

from rest_framework.serializers import Serializer


def get_paginated_response(request:object, queryset:QuerySet, serializer_class: Serializer ):
    total_elements = queryset.count()

    page, size = validate_page_size(request)

    # Pagination
    pagination = Pagination()
    pagination.page = page
    pagination.size = size
    queryset = pagination.paginate_data(queryset)

    serializer = serializer_class(queryset, many=True)

    response = {
        'data': serializer.data,
        'page': pagination.page,
        'size': pagination.size,
        'total_pages': pagination.total_pages,
        'total_elements': total_elements,
    }
    return response