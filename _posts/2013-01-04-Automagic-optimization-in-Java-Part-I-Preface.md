---
layout: post
title: Automagic optimization in Java - Part I (Preface)
tags:
- java
- performance
date: 2013-01-04 09:27:30.000000000 +01:00
---
Some time ago I did a presentation on what the Java Virtual Machine (and to a much lesser extent the Java compiler) do automatically to optimize your code, thus sparing us the hassle (and the resulting ugly code) to do it ourselves. This is intended to be a series looking at what's done automatically and how this will, can or should affect our coding habits. The first part will have a look at some really old advice from the time, when Java was truly slow. This means the late 1990s when Java was interpreted at runtime and didn't sport a JIT-Compiler (which was added in J2SE 1.2 (Codename Playground) in December 1998) or even the HotSpot VM (which was released in April 1999 and introduced into Java in J2SE 1.3 (Codename Kestrel) in May 2000). 

In 1998 Bill Venners, author of [Inside the Java 2 Virtual Machine](http://www.amazon.com/Inside-Java-2-Virtual-Machine/dp/0071350934), wrote an article on developer.com titled "[The Hotspot Virtual Machine](http://www.artima.com/designtechniques/hotspot.html)" that shone some light on the then prevalent optimization lore for Java. 
> If, despite the pleadings of your peers and the advice of software heavyweights such as Donald Knuth, you decide to design your Java program for performance rather than maintainability, here's the popular lore that explains how to do it: 
> 
> 
> 1. make methods final or static wherever possible 
> 2. prefer large classes over small classes 
> 3. prefer large methods over small methods 
> 4. avoid interfaces 
> 5. avoid creating lots of short-lived objects 
> 6. avoid synchronization. 

The advice of Donald Knuth he mentioned is the quote "Premature optimization is the root of all evil", which still holds true. You definitely shouldn't optimize your code for performance until you now for sure that you have a performance-issue and that this issue is for sure caused by a specific piece of code. Just randomly optimizing some code here and there is like throwing rocks in a minefield - Almost definitely blowing something up without any real gain.

Lets have a closer look at these advices:

The first three points are very similar and based on a single issue of the ancient JVM. Dynamic Method dispatch was expensive because it carried a huge overhead. With static or final methods, the JVM was able to work around this dynamic dispatch, while the other two points reduce the number of method invocations in general. 

Point 4 refers to the fact that interface method invocation was even slower than dynamic method dispatch in the available JVMs of those days. So reducing the use of interfaces should reduce the number of interface method invocations and thus boost performance.

Avoiding to create lost of objects (especially short-lived, temporary objects) intends to reduce the overhead by object allocation and garbage collection. Both were quite heavy back then.

The last point is the only one that in a way still holds true, not because Java is bad at synchronization, but because having your code waiting is bad for performance in any language.

While these advices might have been helpful in the 1990s if they were applied to the correct pieces of code (remember, 80 to 90% of the time, your program is executing it very same 10 to 20% of your code), they definitely violate most of the principles of the clean-code paradigm (which wasn't around until about 2008) like 
+ The DRY principle (Don't Repeat Yourself) - If you want to avoid small methods, you're about to repeat yourself 
+ The KISS principle (Keep It Simple, Stupid) - Avoiding object creation will not make things easier 
+ The Single Responsibility Principle - Creating large methods or classes with only a single responsibility seems contradictory 
+ The Interface Segregation Principle - If you don't use interfaces, you'll have trouble with this one (even if it's not about Java interfaces but the API) 

Fortunately the Virtual Machines went quite a way from there to now.