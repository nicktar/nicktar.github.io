---
layout: post
title: Automagic optimization in Java - Part II (Method Inlining)
tags:
- java
- performance
date: 2013-01-30 12:21:00.000000000 +01:00
comments: true
---
One of the most intuitive optimizations the JVM performs is method inlining. It addresses two performance issues and if kept in mind might lead to a code that's better structured and readable. Methods as a concept are quite expensive. To call a method, the JVM has to find the target for dynamic invocation, has to store the current scope on stack, has to jump to the method in question. After executing the method, the JVM has to retrieve the saved scope from the stack and resume working where it left of. Additionally method calls reduce the effectiveness of other optimization methods.


But thanks to the automatic method inlining that's of (close to) no concern to the developer.         

Using method inlining is a double-edged sword for the JVM. While it speeds up the execution and helps other optimizations to perform better, it increases the memory footprint of the application. For the developer, using manual method inlining is a sword that's pretty much single-edged. Its close to blunt on the performance side but will definitely hurt you when it comes to code readability, reusability and general maintainability. 

What the JVM does is pretty much the same as what happens when you use the Inline refactoring in your favorite IDE. It replaces the method call with the method body of the called method. If this would be done all over the place, the memory footprint of your application would just plain explode, so there are a couple of criteria that the JVM uses to determine which methods will be inlined.

The JVM will generally inline short methods that aren't overridden yet. In older versions, when the JVM wasn't able to undo the optimizations it made, this only applied to methods that were declared final but in the current (as in Java 1.5 and newer) JVMs this restriction was lifted. When the inlined method is overridden later, the inlining will be revoked. Additionally every method that isn't overridden yet and only has one caller will be inlined too.

This last point is interesting since it addresses concerns that are directly linked to code readability issues. Whenever you feel like you could extract some code to a new method to improve readability by replacing a handfull of lines by a single aptly named method call, this method will most likely end up with a single caller and private (which is similar to final in terms of method inlining) and will be inlined by the JVM and thus not affecting the performance at all. 

If it has more than one caller or can't be private, you're facing either a design issue or should have refactored the code to a method anyway. 

On the other hand, the shortest methods generally found in Java code are getters and setters. These too will bis very likely candidates for inlining. So what's good for code readability and object oriented (encapsuled) design isn't necessarily bad for the performance. Most common practices don't affect performance at all. In this case it's just refactoring blocks of code to methods and/or the use of lots and lots of small methods (hopefully carrying meaningful names) but as we'll see in later parts of this series, this is equally true for most if not all the stuff that's part of clean code or readable object oriented code in general.

So even if this part is one of the most important from the point of view of the JVM it's one of the easiest to understand. That's why this description ended up rather short.