from django.db import models
from django.contrib.auth.models import User
from enum import Enum

class AuthorRoleEnum(Enum):
    RESEARCHER = 'RESEARCHER'
    STUDENT = 'STUDENT'
    GUEST = 'GUEST'

class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="author")
    bio = models.TextField(blank=True, null=True)
    role = models.CharField(
        max_length=20,
        choices=[(role.name, role.value) for role in AuthorRoleEnum],
        default=AuthorRoleEnum.GUEST.value
    )