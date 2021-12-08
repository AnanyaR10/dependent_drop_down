from django.db import models
from car.models import Car
# Create your models here.


class Model(models.Model):
    name = models.CharField(max_length=50)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.car}-{self.name}"

