from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import Notifications

def notifications(request):
    if request.method == "GET":
        # get notifications in reverse chronological order
        notifications = Notifications.objects.all().order_by("-id")
        return JsonResponse({"notifications": [model_to_dict(n) for n in notifications]})
    return JsonResponse({
        "status": "ERROR",
        "message": "Invalid request method"
    })