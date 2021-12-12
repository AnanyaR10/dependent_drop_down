from django.db import models


class Order(models.Model):
    division = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    upazilla = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return str(self.pk)
