---
layout:   article
title:    Using Jekyll on Pow
date:     2015-02-15 13:57:12
category: tips
tags:     ruby, jekyll, rack, pow
path:     /using-jekyll-on-pow
excerpt: |
  The best way to run Jekyll on pow, is make it works as a Rack application. How do it?<br />
  Check here in this article
media:
  type:     image
  source:   posts_jekyll
  alt:      Jekyll Logo
  caption:  Mr. Hyde would be proud of
---

# Using Jekyll on Pow

The best way to run Jekyll on pow, is make it works as a Rack application. How do it?

If you have created your application using `jekyll new` you need to create a Gemfile with the following content:

```ruby
source 'https://rubygems.org'

gem 'rack-jekyll'
```

and bundle-install-it!

Then create a config.ru with the following content:

```ruby
require 'rubygems'
require 'bundler'
Bundler.setup

require 'rack/jekyll'

run Rack::Jekyll.new
```

I've seen on many places just the require rack/jekyll and run Rack::Jekyll.new but pow said was not able to require 'rack/jekyll' so I added the first 3 lines that is the bundler _prelude_

To finish you just need to link on _~/.pow_ and everything will be ok!
