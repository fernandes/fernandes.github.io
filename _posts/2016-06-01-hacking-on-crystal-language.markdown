---
layout: post
title:  "Hacking on Crystal Language"
date:   2016-06-01 13:46:12
categories: hacking
tags: crystal compiler
image: /assets/article_images/crystal_language.jpg
comments: true
---

# Hacking on Crystal Language

Yesterday I started to help on crystal language, so here I'd like to
share my thoughts as well serve as future reference.

* Issues that needs verification (current codebase)
* Reduce to minimal examples
* Work on small pulls requests

As I knew codetriage.com, I started looking for some old issues to
contribute at least verify if still apply to current codebase.

My first challenge has put the compiler running with some releases (as
crystal still doesn't have a multi-version manager, brew did the job).
The idea was to compile some versions and use brew switch.

You can check this
[gist](https://gist.github.com/fernandes/52dce07fd0b8b902dcfb582c21c56d57)
on how to accomplish this.

After installed recent crystal lang versions I started digging into
issues and found a simple one on the compiler. To work on compiler
issues is must test against compiler head, so here are the steps to get
compiler working:

{% highlight bash %}
xcode-select --install
brew install \
  bdw-gc \
  gmp \
  libevent \
  libpcl \
  libxml2 \
  libyaml \
  llvm
git clone https://github.com/crystal-lang/crystal.git
cd crystal
make
{% endhighlight %}

Really easy, so let's start hacking time!

First, I chose [issue #194](https://github.com/crystal-lang/crystal/issues/194), don't ask
me why I thought would be an easy one hahah

Then when looking for a solution, I found a typo on docs and fixed. First PR sent, cool! It's a nice way to warm up.

ps: Crystal build tests for formatting, including on documentation, so
when sending a doc PR __don't__ use [skip ci]

The workflow for making a change on compiler is:

* Code
* make crystal spec
* Repeat

`make crystal spec` takes a lit bit longer, so you may find useful just
run a specific spec, then run `make crystal spec` before committing.

ps: As I was playing with the compiler, I did `make clean crystal spec`
before PR, just to recompile the compiler and check if everything was
ok, first-time specs were passing, but I broke the compiler hahaha this
is a useful tip ;)

I think everything before was just the introduction and context, let's
now really get into Crystal code.

If you read the issue, was a problem with the enum, values were being
cast to `i32` if not enum base type was specified and default (`i32`)
was assumed, it's crucial to understand the issue and terms
used because it will make easier to search the code.

I started looking at the specs for something similar (Crystal uses the `c_`
prefix for C bindings, as this is a problem on LibC binding example,
began on these files).

Found the
[spec/compiler/type_inference/c_enum_spec.cr](https://github.com/fernandes/crystal/blob/2f6d9e459601b3153c377964bf86dc63160c1bc3/spec/compiler/type_inference/c_enum_spec.cr)
and added the following test (based on other tests) to make it red:

{% highlight ruby %}
it "errors if enum value is different from default (Int32) (#194)" do
  assert_error "lib LibFoo; enum Bar; X = 0x00000001_u32; end; end;
LibFoo::Bar::X",
    "enum value must be an Int32"
end
{% endhighlight %}

ps: Its a crystal convention to add `(#123)` to identify the issue that
test is covering.

Now was time to make it green, how do this? It was time to work on
compiler source code.

As far as I remember from compiler classes, it wouldn't be a lexer job
because the tokens were ok, just the meaning wasn't then on
`src/compiler/crystal` I found the `semantic` folder and searched for
enum exception being triggered.

Then, I found this
[exception](https://github.com/fernandes/crystal/blob/2f6d9e459601b3153c377964bf86dc63160c1bc3/src/compiler/crystal/semantic/top_level_visitor.cr#L580)
being raised, and thought "cool, found an enum value check, so let's
start working on this piece of code."

After a few time, I made it green with the
[code](https://github.com/crystal-lang/crystal/pull/2703/files#diff-6a2ecb55e60454c135921c7303eeaa99R567)

This one checks the enum base type (it is the default one if value is `i32`), and
then if any value is not an `i32` then an exception is raised. (any
question about this leave in the comments)

Run `make clean crystal spec` and make sure everything is ok.

ps: Don't forget to run `crystal tool format` to format the source code.

After all of this,
[PR](https://github.com/crystal-lang/crystal/pull/2703) opened!

## Considerations

This contribution was an enjoyable time, I'd like to enumerate some reasons:

* It took 4 hours the complete process, never thought would be possible
  to make my first contribution in so fewer time.
* As the compiler is written in Crystal, it's easy to read / code
  (I'm not an experienced Crystal dev)
* Contributing to a compiler/programming language is amazing.
* I learned a lot of compile-time / runtime in Crystal
* Here I put the obvious steps (I did __A LOT__ of mistakes before
  make it working)

Would like to thank [@jhass](https://github.com/jhass) for all patience
and support during this journey.

I hope this post serve as an inspiration to other contributors, after
reading this, do you consider contributing to Crystal or another
programming language?
