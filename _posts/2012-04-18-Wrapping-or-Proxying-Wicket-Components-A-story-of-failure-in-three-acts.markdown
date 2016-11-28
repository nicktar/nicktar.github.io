---
layout: post
title: 'Wrapping or Proxying Wicket Components - A story of failure in three acts '
categories:
- Wicket-CRUDr
- AOP
- apache
- Aspect oriented programming
- delegate pattern
- dependency injection
- google guice
- guice
- javassist
- pattern
- proxy pattern
- software development
- wicket-crudr
permalink: "/archives/21-Wrapping-or-Proxying-Wicket-Components-A-story-of-failure-in-three-acts.html"
s9y_link: http://wicket-game.gwassist.de/archives/21-Wrapping-or-Proxying-Wicket-Components-A-story-of-failure-in-three-acts.html
date: 2012-04-18 13:45:43.000000000 +02:00
---
<p>When working on Wicket CRUDr, I encountered a problem which could be used easily by using a simple wrapper or proxy for existing components. These components are to be created by factory methods and need some additional functionality (like specific implementations of the onModelChanged-methods). Since I wanted to dumb down these factories and didn't want to have everyone implementing new factories to have to know about these, I thought, it would be nice to add the functionality afterwards.
</p>
<p>I tried three different approaches and none of them worked so, right now I've got to live without these features. Here is what I tried:</p>
<ol>
<li>Creating a delegating wrapper</li>
<li>Using java.lang.Proxy</li>
<li>Using AOP (a) by Google Guice and (b) by Javassist<br /></li>
</ol> <br /><a href="http://wicket-game.gwassist.de/archives/21-Wrapping-or-Proxying-Wicket-Components-A-story-of-failure-in-three-acts.html#extended">Continue reading "Wrapping or Proxying Wicket Components - A story of failure in three acts "</a>
