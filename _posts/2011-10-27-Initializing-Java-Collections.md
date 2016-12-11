---
layout: post
comments: true
title: Initializing Java Collections
tags:
- software development
- static
categories:
- software development
- java
- tips & tricks
date: 2011-10-27 15:12:35.000000000 +02:00
---
Most of us know that an array in Java can be initialized by

{% highlight java linenos %}
String[] fruit = new String[] {"apple", "cherry"};
{% endhighlight %}


I say "most" and not "all" since arrays aren't that common in everyday Java usage with all those handy collections around. One of the major (perceived) downsides of those, they're ugly to initialize.
 
{% highlight java linenos %} 
List fruit = new ArrayList("apple", "cherry");
{% endhighlight %} 
 
just doesn't work and

{% highlight java linenos %} 
List fruit = new ArrayList();
fruit.add("apple");
fruit.add("cherry");
{% endhighlight %} 

doesn't look to nice. But did you know, you could do this?

{% highlight java linenos %}
{% raw %} 
List fruit = new ArrayList() {{
    add("apple");
    add("cherry");
}};
{% endraw %}
{% endhighlight %} 
 
O.K. basically it looks very similar (except for the missing variable names) and it gives the same result so why bother? First it's optically separated from the rest of the code, thus easily recognized as an initializer for the list. Second it's not just a new list and two elements added to it. It's an anonymous subclass of ArrayList with a static initializer, thus an innocent @SuppressWarnings("serial") might be needed to silence your compiler's warnings...
