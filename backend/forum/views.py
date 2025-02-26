from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def testing(request):
  return HttpResponse("Hello World")

def create_discussion_thread(request):
  return HttpResponse("Discussion thread created successfully!")