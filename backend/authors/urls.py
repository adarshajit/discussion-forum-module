from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    path('edit/<int:author_id>', views.edit_author)
]
