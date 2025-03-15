import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Author, AuthorRoleEnum

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register(request):
    try:
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        bio = data.get("bio", "")
        role = data.get("role", AuthorRoleEnum.GUEST.value)
        avatar_url = data.get("avatar_url", "")
        if not username or not password:
            return JsonResponse({"error": "Username and password are required"}, status=400)
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)
        user = User.objects.create_user(username=username, password=password)
        author = Author.objects.create(user=user, bio=bio, role=role, avatar_url=avatar_url)
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            "message": "User registered successfully!",
            "user_id": user.id,
            "author_id": author.id,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def login(request):
    try:
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            author = Author.objects.get(user=user)
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                "message": "Login successful!",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "username": user.username,
                    "bio": author.bio,
                    "role": author.role,
                    "avatar_url": author.avatar_url
                }
            }, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['PUT'])
@permission_classes([AllowAny])
@csrf_exempt
def edit_author(request, author_id):
    try:
        data = json.loads(request.body)
        author = Author.objects.select_related('user').get(id=author_id)

        # Update author fields if provided
        if 'bio' in data:
            author.bio = data['bio']
        if 'role' in data:
            author.role = data['role']
        if 'avatar_url' in data:
            author.avatar_url = data['avatar_url']
            
        author.save()

        return JsonResponse({
            "message": "Author updated successfully!",
            "author": {
                "username": author.user.username,
                "bio": author.bio,
                "role": author.role,
                "avatar_url": author.avatar_url
            }
        }, status=200)
    except Author.DoesNotExist:
        return JsonResponse({"error": "Author not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)