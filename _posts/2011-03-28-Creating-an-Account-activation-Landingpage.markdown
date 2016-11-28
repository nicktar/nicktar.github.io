---
layout: post
title: Creating an Account activation Landingpage
categories:
- Apache Wicket
- apache
- apache wicket
- bookmarkable
- dependency injection
- guildwars assistant
- gwassist.de
- java
- landingpage
- software development
- stateless
permalink: "/archives/15-Creating-an-Account-activation-Landingpage.html"
s9y_link: http://wicket-game.gwassist.de/archives/15-Creating-an-Account-activation-Landingpage.html
date: 2011-03-28 18:35:38.000000000 +02:00
---
<p>For my current project which is in alpha-test right now, I wanted to verify a user's mail address on sign up, using the usual approach of sending him an email containing a link to a landing page, he has to visit to activate his account. To my surprise I couldn't find an existing implementation of this.</p> 
<p>Taking a look at jForum, I decided not to use their way for not being wicket and for being a little over the top for my requirements.</p> 
<p>These were:</p> 
<ul> 
<li>I wanted a landing page with a decent looking URL</li> 
<li>I wanted to be able to use the same procedure for further landing pages like 'Forgot password' and the like, whatever 'the like' might be.</li> 
<li>I don't want to send HTML-emails. Plain-Text has always been good enough for me and since most of the email-readers transform URLs to links anyway, HTML would be an unnecessary overhead.</li> 
<li>I wanted the landing-page to throw 404 errors when called with incorrect or expired data.</li> 
</ul> <br /><a href="http://wicket-game.gwassist.de/archives/15-Creating-an-Account-activation-Landingpage.html#extended">Continue reading "Creating an Account activation Landingpage"</a>
