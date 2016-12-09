---
layout: post
comments: true
title: Creating an Account activation Landingpage
tags:
- apache wicket
- bookmarkable
- dependency injection
- java
- landingpage
- software development
- stateless
date: 2011-03-28 18:35:38.000000000 +02:00
---
For my current project which is in alpha-test right now, I wanted to verify a user's mail address on sign up, using the usual approach of sending him an email containing a link to a landing page, he has to visit to activate his account. To my surprise I couldn't find an existing implementation of this.

Taking a look at jForum, I decided not to use their way for not being wicket and for being a little over the top for my requirements.

These were: 
- I wanted a landing page with a decent looking URL 
- I wanted to be able to use the same procedure for further landing pages like 'Forgot password' and the like, whatever 'the like' might be. 
- I don't want to send HTML-emails. Plain-Text has always been good enough for me and since most of the email-readers transform URLs to links anyway, HTML would be an unnecessary overhead. 
- I wanted the landing-page to throw 404 errors when called with incorrect or expired data. 

The first part was kind of easy...

<p>First I wrote my landing-page with a PageParameter-accepting constructor</p>

{% highlight java linenos %} 
package de.gwassist.wicket
 
public class GwaApplication extends WicketApplication {
    protected void init() {
       super.init();
       mount("/landing",PackageName.forClass(ActivateAccountPage.class));
    }
}
{% endhighlight %} 

and extended my application's init() method to

{% highlight java linenos %} 
package de.gwassist.wicket

public class GwaApplication extends WicketApplication {
    protected void init() {
        super.init();
        mount("/landing",PackageName.forClass(ActivateAccountPage.class));
    }
}
{% endhighlight %} 

Since I mounted the whole package, this will take care of my second requirement as well.

This leaves me with a decent looking link somewhere along the lines of

{% highlight html linenos %} 
landing/AccountActivationPage/accountId/4512542/key/OGygQqsD8eN02ADooN130VSpsOx1VNnFwmo
{% endhighlight %} 

which is decent looking but, since it's a relative link, not suitable for email. My first idea, to add the server-part of the uri by concatenating a configurable String in front of the link didn't appeal to me since I've currently got 2 environments (development and testing) with a 3rd one (production) coming up. I'm simply to damn lazy to keep track of any changes to these environments and keep the config up to date. That's where this nice sniplet comes handy:

{% highlight java linenos %} 
String link = RequestUtils.toAbsolutePath(urlFor(AccountActivationPage.class, params).toString());
{% endhighlight %} 

Unfortunately urlFor is a function of Component so I face the choice to generate and inject the link from outside of my mailer-util-class or to create a dependency to Component. The later one looks very much like a BadIdea(TM) so the link get's created from within the form that triggers the email in first place. This still doesn't look good so maybe I'll come up with a better solution.

But at the end of the day, I get a link to

{% highlight html linenos %} 
http://localhost/landing/AccountActivationPage/accountId/4512542/key/OGygQqsD8eNADooN130VSpsOx1VNnFwmo
{% endhighlight %} 

for my local dev environment.
