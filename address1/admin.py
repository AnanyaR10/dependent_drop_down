from django.contrib import admin
from .models import Address1

# Register your models here.
class AddressFields(admin.ModelAdmin):
    list_display = (Address1, 'division', 'district', 'upazilla')

admin.site.register(Address1, AddressFields)
