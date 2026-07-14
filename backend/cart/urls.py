from django.urls import path
from .views import add_to_cart, get_cart, delete_cart_item


urlpatterns = [

    path("add/", add_to_cart),

    path("", get_cart),
    path("delete/<int:id>/", delete_cart_item),

]