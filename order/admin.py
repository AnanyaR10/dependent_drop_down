from django.contrib import admin
from .models import Order

# Register your models here.
class OrderFields(admin.ModelAdmin):
    list_display = (Order, 'division', 'district', 'upazilla')

admin.site.register(Order, OrderFields)
