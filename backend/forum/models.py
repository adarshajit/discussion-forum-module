from django.db import models

class DiscussionForum(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    topic = models.CharField(max_length=25)
    upvotes = models.DecimalField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
