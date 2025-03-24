from django.urls import path
from . import views

urlpatterns = [
  path("show-all", views.notifications, name="notifications"),
]