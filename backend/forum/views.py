import json
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import DiscussionThread, DiscussionComment
from django.contrib.auth.models import User
from .tasks import handle_comment_creation, handle_thread_creation

@api_view(['POST'])
def create_discussion_thread(request):
    try:
        data = json.loads(request.body)
        title = data.get("title")
        description = data.get("description")
        category = data.get("category")
        if not title or not description or not category:
            return JsonResponse({"error": "All fields are required"}, status=400)
        username = data.get('username')
        author = User.objects.get(username=username)
        thread = DiscussionThread.objects.create(
            title=title,
            description=description,
            category=category,
            author=author
        )
        handle_thread_creation.delay(thread.title)
        return JsonResponse({
            "message": "Discussion thread created successfully!",
            "thread_id": thread.id
        }, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
def create_discussion_comment(request, thread_id):
    try:
        data = json.loads(request.body)
        description = data.get("description")
        if not description:
            return JsonResponse({"error": "Description is required"}, status=400)
        username = data.get('username')
        author = User.objects.get(username=username)
        discussion = DiscussionThread.objects.get(id=thread_id)
        comment = DiscussionComment.objects.create(
            description=description,
            author=author,
            discussion=discussion
        )
        handle_comment_creation.delay(comment.author.username)
        return JsonResponse({
            "message": "Comment added successfully!",
            "comment_id": comment.id
        }, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

# Helper function to get author data
def get_author_data(user):
    return {
        "username": user.username,
        "bio": user.author.bio if hasattr(user, "author") else None,
        "role": user.author.role if hasattr(user, "author") else None,
        "avatar_url": user.author.avatar_url if hasattr(user, "author") else None
    }

@api_view(['GET'])
@permission_classes([AllowAny])
def view_discussion_thread(request, thread_id):
    try:
        thread = DiscussionThread.objects.select_related('author__author').get(id=thread_id)
        comments = DiscussionComment.objects.select_related('author__author').filter(discussion=thread)
        
        comments_data = [{
            "id": comment.id,
            "description": comment.description,
            "author": get_author_data(comment.author),
            "created_at": comment.created_at,
            "updated_at": comment.updated_at
        } for comment in comments]

        thread_data = {
            "id": thread.id,
            "title": thread.title,
            "description": thread.description,
            "category": thread.category,
            "upvotes": thread.upvotes,
            "author": get_author_data(thread.author),
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
                "author": get_author_data(thread.author),
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
            "author": get_author_data(comment.author),
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

@api_view(['PUT'])
@permission_classes([AllowAny])
def edit_discussion_thread(request, thread_id):
    try:
        data = json.loads(request.body)
        thread = DiscussionThread.objects.select_related('author__author').get(id=thread_id)

        # Update fields if provided
        if 'title' in data:
            thread.title = data['title']
        if 'description' in data:
            thread.description = data['description']
        if 'category' in data:
            thread.category = data['category']
            
        thread.save()

        return JsonResponse({
            "message": "Discussion thread updated successfully!",
            "thread": {
                "id": thread.id,
                "title": thread.title,
                "description": thread.description,
                "category": thread.category,
                "upvotes": thread.upvotes,
                "author": get_author_data(thread.author),
                "created_at": thread.created_at,
                "updated_at": thread.updated_at
            }
        }, status=200)
    except DiscussionThread.DoesNotExist:
        return JsonResponse({"error": "Discussion thread not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
