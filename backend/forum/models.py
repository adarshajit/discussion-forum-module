from django.db import models
from django.contrib.auth.models import User 

class DiscussionThread(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=25)
    upvotes = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="threads")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class DiscussionComment(models.Model):
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    discussion = models.ForeignKey(DiscussionThread, on_delete=models.CASCADE, related_name="comments")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)