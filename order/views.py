from django.shortcuts import render
from car.models import Car
from model.models import Model
from django.http import JsonResponse
# Create your views here.


def main_view(request):
    qs = Car.objects.all()
    return render(request, 'main.html', {'qs': qs})


def get_json_car_data(request):
    qs_val = list(Car.objects.values())
    return JsonResponse({'data': qs_val})


def get_json_model_data(request, *args, **kwargs):
    selectedCar = kwargs.get('car')
    obj_models = list(Model.objects.filter(car__name=selectedCar).values())
    return JsonResponse({'data': obj_models})
