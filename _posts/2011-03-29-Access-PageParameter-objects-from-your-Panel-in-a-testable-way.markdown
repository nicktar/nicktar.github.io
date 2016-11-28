---
layout: post
title: Access PageParameter objects from your Panel in a testable way
categories:
- Apache Wicket
- apache
- apache wicket
- dependency injection
- guildwars assistant
- gwassist.de
- java
- software development
- wickettester
permalink: "/archives/14-Access-PageParameter-objects-from-your-Panel-in-a-testable-way.html"
s9y_link: http://wicket-game.gwassist.de/archives/14-Access-PageParameter-objects-from-your-Panel-in-a-testable-way.html
date: 2011-03-29 14:32:31.000000000 +02:00
---
<p>When trying to build stateless pages without the user noticing, like building an application using AjaxFallBackLinks and reusing the fall-back to provide a search-engine-friendly version of your application, you've got to put the state into PageParamaters, which can be transported via bookmarkable links.</p> 
<p>The most obvious way to access these Parameters from your Panel is a simple getPage().getPageParameters(). But as simple as it looks this is bad in a couple of ways. First it introduces tight coupling between your Panel and Page, which makes it hard to test (as in: you need to provide a page to test the Panel.). Second getPage() isn't available on construction-time. So calling getPage().getPageParameters() in the panel's constructor throws a NullPointerException.</p> 
<p>If it's hard to test you're probably doing it wrong.</p> <br /><a href="http://wicket-game.gwassist.de/archives/14-Access-PageParameter-objects-from-your-Panel-in-a-testable-way.html#extended">Continue reading "Access PageParameter objects from your Panel in a testable way"</a>
