---
layout: post
comments: true
title: Don't take anything for granted - iterating over a java.util.Stack
tags:
- common pitfall
- j2ee
- java
- java enterprise
- pitfall
- puzzler
- rant
- software development
date: 2012-06-19 20:14:00.000000000 +02:00
comments: true
---
Don't ever think just because a certain way of doing things seems reasonable or logical to you or anyone else means it's implemented that way.

> In [computer science](http://en.wikipedia.org/wiki/Computer_science), a *stack* is a last in, first out [(LIFO)](http://en.wikipedia.org/wiki/LIFO_%28computing%29) 
> [abstract data type](http://en.wikipedia.org/wiki/Abstract_data_type) and linear [data structure](http://en.wikipedia.org/wiki/Data_structure). 

<p align="right">from wikipedia </p> 

The key characteristic here is "last in, first out". So, when I do something like this:
{% highlight java linenos %}Stack<String> myStack = new Stack<>();
myStack.push("a");
myStack.push("b");
myStack.push("c");
myStack.push("d");
{% endhighlight %}

and then "go through" the stack and print every item, I'd expect something very much like *dcba* as the result, pretty much like what I get doing this:

{% highlight java linenos %}while (!myStack.empty()) {
    System.out.print(myStack.pop());
}
{% endhighlight %}

But completely different from what I get doing this:

{% highlight java linenos %}for (String item: myStack) {
    System.out.print(item);
}
{% endhighlight %}

This prints *abcd*, which is definitely surprising, at least to me and it's so surprising that it fools me every time I use this class. A stack a such should offer two functions, push and pop and maybe a peek-method as well. It's meant to store data and return it in reverse order while destroying itself. I'm not sure if I'd expect the foreach to destroy my stack but I' pretty sure, this shouldn't implement a hidden reverse or invert method.
