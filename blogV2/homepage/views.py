from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render, render_to_response, redirect, get_object_or_404
from django.contrib import messages

# Create your views here.
from homepage.models import *


def homepage(request):
    comment_all = Comment.objects.all().order_by("-date", "-time")
    return render(request, 'index.html',
                  {'comment_all': comment_all})


def add_comment(request):
    post_id = request.POST.get('post_id')
    # p = get_object_or_404(Post, post_id=post_id)

    author = request.POST.get('author')

    comment_content = request.POST.get('content')
    if not comment_content:
        messages.error(request, 'Illegal action, redirect to global stream')
        return HttpResponse(request)

    c = Comment.objects.create(
        belong_to_post=post_id,
        author=author,
        content=comment_content)
    # p.comments.add(c)
    # p.save()
    c.save()

    # response_text = serializers.serialize("json", [c, author])
    # return HttpResponse(response_text, content_type="application/json")
    return HttpResponse('ok')


def get_comment_for_this_post(request, post_id):
    p = Comment.objects.filter(belong_to_post=post_id)
    response_text = serializers.serialize("json", p)
    return HttpResponse(response_text, content_type="application/json")
