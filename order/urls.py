from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_view, name='main_view'),
    path('cars-json/', views.get_json_car_data, name='cars-json'),
    path('models-json/<str:car>/', views.get_json_model_data, name='models-json'),
    path('upazillas-json/<str:model>/', views.get_json_upazilla_data, name='upazillas-json'),
    path('create/',views.create_order,name='create-order'),
]
