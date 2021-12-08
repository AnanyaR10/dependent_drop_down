from django.shortcuts import render
from car.models import Car
from model.models import Model
from upazilla.models import Upazilla
from .models import Order
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

def get_json_upazilla_data(request, *args, **kwargs):
    selectedModel = kwargs.get('model')
    obj_upazillas = list(Upazilla.objects.filter(model__name=selectedModel).values())
    return JsonResponse({'data': obj_upazillas})

def create_order(request):
    if request.is_ajax():
        car=request.POST.get('car')
        car_obj=Car.objects.get(name=car)
        model=request.POST.get('model')
        model_obj=Model.objects.get(name=model, car__name=car_obj.name)
        Order.objects.create(car=car_obj, model=model_obj)
        return JsonResponse({'created':True})
    else:
        return JsonResponse({'created': False}, safe=False)