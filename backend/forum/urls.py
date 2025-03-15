from django.urls import path
from . import views

urlpatterns = [
    path('thread/create', views.create_discussion_thread, name='create_discussion_thread'),
    path('thread/<int:thread_id>/edit', views.edit_discussion_thread, name='edit_discussion_thread'),
    path('thread/<int:thread_id>/comment/create', views.create_discussion_comment, name='create_discussion_comment'),
    path('thread/<int:thread_id>/', views.view_discussion_thread, name='view_discussion_thread'),
    path('threads/', views.list_all_discussion_threads, name='list_all_discussion_threads'),
    path('thread/<int:thread_id>/comments', views.list_all_comments_for_thread, name='list_all_comments_for_thread')
]