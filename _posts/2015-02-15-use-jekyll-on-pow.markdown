---
layout: post
title:  "Use jekyll on pow"
date:   2015-02-15 13:57:12
categories: tips
tags: ruby jekyll rack pow
image: /assets/article_images/jekyll.jpg
---
The best way to run Jekyll on pow, is make it works as a Rack application. How do it?

If you have created your application using `jekyll new` you need to create a Gemfile with the following content:

{% highlight ruby %}
source 'https://rubygems.org'

gem 'rack-jekyll'
{% endhighlight %}

and bundle-install-it!

Then create a config.ru with the following content:

{% highlight ruby linenos %}
require 'rubygems'
require 'bundler'
Bundler.setup

require 'rack/jekyll'

run Rack::Jekyll.new
{% endhighlight %}

I've seen on many places just the require rack/jekyll and run Rack::Jekyll.new but pow said was not able to require 'rack/jekyll' so I added the first 3 lines that is the bundler _prelude_

To finish you just need to link on _~/.pow_ and everything will be ok!
