from django.shortcuts import render
from car.models import Car
from model.models import Model
from upazilla.models import Upazilla
from .models import Order
from django.http import JsonResponse
import requests
# Create your views here.


def main_view(request):
    return render(request, 'main.html')


def get_json_division_data(request):
    data=requests.get("https://bdapis.herokuapp.com/api/v1.1/divisions")
    division=list(data.json()['data'])
    return JsonResponse({'data': division})


def get_json_district_data(request, *args, **kwargs):
    selectedDivision = kwargs.get('division')
    req=requests.get("https://bdapis.herokuapp.com/api/v1.1/division/"+selectedDivision)
    district=list(req.json()['data'])
    return JsonResponse({'data': district})

def get_json_upazilla_data(request, *args, **kwargs):
    selectedDivision = kwargs.get('division')
    selectedDistrict = kwargs.get('district')
    req=requests.get("https://bdapis.herokuapp.com/api/v1.1/division/"+selectedDivision)
    district=req.json()['data'] 

    #filtering upazillas based on district
    upazilla=[]
    for i in district:
        if i['district']==selectedDistrict: 
            upazilla=i["upazilla"]
            break
        
    #formatting to send as json
    upazilla_list=[]
    for up in upazilla:
        new_dict={"upazilla":up}
        upazilla_list.append(new_dict)
    return JsonResponse({'data': upazilla_list})

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