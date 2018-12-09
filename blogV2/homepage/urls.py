from django.urls import path

from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path(r'add_comment', views.add_comment, name='add_comment'),
    # path(r'^get_comment_for_this_post/(?P<id>\d+)/$$', views.get_comment_for_this_post,
    #     name='get_comment_for_this_post'),
]