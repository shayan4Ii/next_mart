from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.Signup, name="signup"),
    path("login/", views.Login, name="login"),
    path("home/", views.Home, name="home"),
    path("csrf/", views.csrf),
    path("logout/", views.Logout),
    path("change_password/", views.changepass)
]