from django.db import models

# Create your models here.


class Car(models.Model):
    name = models.CharField(max_length=80)
    country = models.CharField(max_length=100)

    def __str__(self):
        return str(self.name)
