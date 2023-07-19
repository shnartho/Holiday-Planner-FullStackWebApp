from django.db import models

from django_currentuser.db.models import CurrentUserField


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    created_by = CurrentUserField(on_delete=models.SET_NULL, related_name="+", blank=True)
    updated_by = CurrentUserField(on_update=True, on_delete=models.SET_NULL, related_name="+", blank=True)

    class Meta:
        abstract = True