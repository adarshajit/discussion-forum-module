import json
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import DiscussionThread, DiscussionComment
from django.contrib.auth.models import User

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_discussion_thread(request):
    try:
        data = json.loads(request.body)
        title = data.get("title")
        description = data.get("description")
        category = data.get("category")
        if not title or not description or not category:
            return JsonResponse({"error": "All fields are required"}, status=400)
        author = User.objects.get(username="test_user")
        thread = DiscussionThread.objects.create(
            title=title,
            description=description,
            category=category,
            author=author
        )
        return JsonResponse({
            "message": "Discussion thread created successfully!",
            "thread_id": thread.id
        }, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_discussion_comment(request, thread_id):
    try:
        data = json.loads(request.body)
        description = data.get("description")
        if not description:
            return JsonResponse({"error": "Description is required"}, status=400)
        author = User.objects.get(username="test_user")
        discussion = DiscussionThread.objects.get(id=thread_id)
        comment = DiscussionComment.objects.create(
            description=description,
            author=author,
            discussion=discussion
        )
        return JsonResponse({
            "message": "Comment added successfully!",
            "comment_id": comment.id
        }, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def view_discussion_thread(request, thread_id):
    try:
        thread = DiscussionThread.objects.select_related('author__author').get(id=thread_id)
        comments = DiscussionComment.objects.select_related('author__author').filter(discussion=thread)
        
        comments_data = [{
            "id": comment.id,
            "description": comment.description,
            "author": {
                "username": comment.author.username,
                "bio": comment.author.author.bio if hasattr(comment.author, "author") else None,
                "role": comment.author.author.role if hasattr(comment.author, "author") else None
            },
            "created_at": comment.created_at,
            "updated_at": comment.updated_at
        } for comment in comments]

        thread_data = {
            "id": thread.id,
            "title": thread.title,
            "description": thread.description,
            "category": thread.category,
            "upvotes": thread.upvotes,
            "author": {
                "username": thread.author.username,
                "bio": thread.author.author.bio if hasattr(thread.author, "author") else None,
                "role": thread.author.author.role if hasattr(thread.author, "author") else None
            },
            "created_at": thread.created_at,
            "updated_at": thread.updated_at,
            "comments": comments_data
        }
        return JsonResponse(thread_data, status=200)
    except DiscussionThread.DoesNotExist:
        return JsonResponse({"error": "Discussion thread not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def list_all_discussion_threads(request):
    try:
        threads = DiscussionThread.objects.select_related("author__author").all()

        thread_list = [
            {
                "id": thread.id,
                "title": thread.title,
                "description": thread.description,
                "category": thread.category,
                "upvotes": thread.upvotes,
                "author": {
                    "username": thread.author.username,
                    "bio": thread.author.author.bio if thread.author.author else None,
                    "role": thread.author.author.role if thread.author.author else None
                } if hasattr(thread.author, "author") else None,
                "created_at": thread.created_at,
                "updated_at": thread.updated_at
            }
            for thread in threads
        ]

        return JsonResponse(thread_list, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_all_comments_for_thread(request, thread_id):
    try:
        thread = DiscussionThread.objects.get(id=thread_id)

        comments = DiscussionComment.objects.select_related('author__author').filter(discussion=thread)

        comments_data = [{
            "id": comment.id,
            "description": comment.description,
            "author": {
                "username": comment.author.username,
                "bio": comment.author.author.bio if hasattr(comment.author, "author") else None,
                "role": comment.author.author.role if hasattr(comment.author, "author") else None
            },
            "created_at": comment.created_at,
            "updated_at": comment.updated_at
        } for comment in comments]

        return JsonResponse({
            "thread_id": thread.id,
            "comments": comments_data
        }, status=200)

    except DiscussionThread.DoesNotExist:
        return JsonResponse({"error": "Discussion thread not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
