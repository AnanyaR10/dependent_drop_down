from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_view, name='main_view'),
    path('cars-json/', views.get_json_car_data, name='cars-json'),
    path('models-json/<str:car>/', views.get_json_model_data, name='models-json'),
]
