from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Comment(models.Model):
    # belong_to_post = models.OneToOneField(Post, on_delete=models.CASCADE)
    # belong_to_post = models.ForeignKey('Post')
    belong_to_post = models.IntegerField()
    author = models.CharField(max_length=100)
    # author = models.OneToOneField(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=150)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return "{0}, {1}, {2}, {3}".format(
            self.author,
            self.content,
            self.date,
            self.time)


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    email = models.EmailField()
    comments = models.ManyToManyField(Comment, symmetrical=False, related_name='comments')

    def __str__(self):
        return "{0}:{1} - {2}, {3}". \
            format(self.email, self.content, self.time, self.date)
