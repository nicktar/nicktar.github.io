---
layout: post
title: Hibernation seasons are over (for now)
tags:
    - blog
    - announcement
categories:
- blog
- announcement
date: 2016-12-11 16:13:31.000000000 +01:00
comments: true
---
So after about three years, I remembered that I have a blog out there that I haven't been actually maintaining or contributing to all those years. When faced with the decision of either abandon ship or keep the stuff in a safe way, I opted for a forth variant, keeping the stuff in a safe place while still contributing to it. So the first step was to move everything out of my personal server so that possible future breaches wouldn't spill out to that machine and the projects living there. The second step was to ditch serendipity as a blog software to reduce the number of active components and thus possible points of failure. Running a Java center blog powered by PHP felt strange anyway. In the end that led me to github pages and a blog consisting of static pages provided by [jekyll] [1].


So I replaced PHP with Ruby, but I still don't like JRoller and don't have the time to evaluate all the other options. After all, I want to get the stuff out and jekyll seems easy and fast enough even if the serendipity importer didn't really work and I had to import and convert everything by hand. Having another set of dynamically generated pages would require me to keep the stuff up to speed in case there are any issues, so static jekyll pages seem a pretty good fit.

The current modus operandi is: Whenever I feel like I'm having something to post and whenever I feel like posting, I'll do so but I'll not commit to any regular schema, because after all this is a hobby and not my main one. 

[1]: https://jekyllrb.com/ "Jekyll - Simple, blog-aware, static sites"