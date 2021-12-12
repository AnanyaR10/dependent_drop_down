from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_view, name='main_view'),
    path('divisions-json/', views.get_json_division_data, name='divisions-json'),
    path('districts-json/<str:division>/', views.get_json_district_data, name='models-json'),
    path('upazillas-json/<str:division>/<str:district>/', views.get_json_upazilla_data, name='upazillas-json'),
    path('create/',views.create_order,name='create-order'),
]
