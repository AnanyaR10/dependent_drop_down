from django.db import models
from model.models import Model
# Create your models here.


class Upazilla(models.Model):
    name = models.CharField(max_length=50)
    model = models.ForeignKey(Model, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.model}-{self.name}"
