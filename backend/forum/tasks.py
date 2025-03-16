from celery import shared_task
from notifications.models import Notifications

@shared_task()
def handle_comment_creation(username):
    Notifications.objects.create(
        title="New comment on your post.",
        description=f"{username} has left comment on your thread."
    )

@shared_task()
def handle_thread_creation(thread_title):
    Notifications.objects.create(
        title="New thread created",
        description=f"A new thread with title:{thread_title} has been posted"
    )