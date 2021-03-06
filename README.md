# blog-2.0
> Dec 7, 2018, notes before implementation

Till today, [my blog](https://yachenlin.com/) is just a static content page hosted on GitHub. One of my friends just came up with an idea of adding comments for each post. And here comes to this `blog-2.0`.

At first, I did some research on how to add a comments plugin for jekyll-powered static site, tried a few, but they really got limited flexibility. So what about creating a dynamic site and getting familiar with some of those AWS services?

What do I need? A web framework, an automated deployment process and docker! (According to Google Analytics's report, my site just got about 100 visits per week, it's really no need to scale it :p)

The workflow should be like this:
Everytime a new post / styling change is being made, master build will trigger the deployment process and spin up new docker container(s) on AWS EKS, expose it, done.

> Dec 8, 2018
Kubernetes is set.
Added dockerfile for django

> Dec 9, 2018

All right, I decided to use AWS Beanstalk for now :P

Now the backend is a Django server with postgresSQL.

Now my blog has a global commenting area!

> Future work
+ Comments for each post
+ Markdown syntax support
+ Write posts to db
+ Automate deployment process

