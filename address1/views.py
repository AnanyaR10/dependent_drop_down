from django.shortcuts import render
from .models import Address1
from django.http import JsonResponse
import requests
from django.db.models import Q
# Create your views here.


def main_view(request):
    return render(request, 'main.html')

# functions for live search
def address_detail_view(request,pk):
    pass

def search_results(request):
    if request.is_ajax():
        address=request.POST.get('address')
        qs=Address1.objects.filter(Q(division__startswith=address) | Q(district__startswith=address))
        if len(qs)>0 and len(address)>0:
            data=[]
            for pos in qs:
                item={
                    'pk':pos.id,
                    'division':pos.division,
                    'district':pos.district,
                    'upazilla':pos.upazilla

                }
                data.append(item)
            res=data
        else:
            res='No address found'
        return JsonResponse({'data': res})
    return JsonResponse({})

#functions for dependent dropdown
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
        division_name=request.POST.get('division')
        district_name=request.POST.get('district')
        upazilla_name=request.POST.get('upazilla')
        Address1.objects.create(division=division_name,district=district_name,upazilla=upazilla_name)
        return JsonResponse({'created':True})
    else:
        return JsonResponse({'created': False}, safe=False)


