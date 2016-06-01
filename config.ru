require 'rubygems'
require 'bundler'
Bundler.setup

require 'yaml'
require 'rack/jekyll'

run Rack::Jekyll.new
