from celery import shared_task
from celery.utils.log import get_task_logger
from notifications.models import Notifications

logger = get_task_logger(__name__)

@shared_task()
def handle_comment_creation(username):
    try:
        logger.info(f"Creating notification for user: {username}")
        Notifications.objects.create(
            title="New comment on your post.",
            description=f"{username} has left comment on your thread."
        )
        logger.info("Notification created successfully.")
    except Exception as e:
        logger.error(f"Error creating notification: {str(e)}")


@shared_task()
def handle_thread_creation(thread_title):
    try:
        logger.info(f"Creating notification for new thread: {thread_title}")
        Notifications.objects.create(
            title="New thread created",
            description=f"A new thread with title: {thread_title} has been posted"
        )
        logger.info(f"Notification created successfully for thread: {thread_title}")
        
    except Exception as e:
        logger.error(f"Error creating notification for thread '{thread_title}': {str(e)}")