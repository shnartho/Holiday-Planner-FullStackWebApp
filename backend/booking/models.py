from django.db import models

from authentication.models import User
from commons.models import TimeStampMixin


# Create your models here.


class Booking(TimeStampMixin, models.Model):
	
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    start_date = models.DateField()
    end_date = models.DateField()

    details = models .TextField(null=True, blank=True)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return f"<{self.user.name}: {self.start_date}-{self.end_date}>"