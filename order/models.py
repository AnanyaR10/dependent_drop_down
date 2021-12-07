from django.db import models
from car.models import Car
from model.models import Model


class Order(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    model = models.ForeignKey(Model, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)
