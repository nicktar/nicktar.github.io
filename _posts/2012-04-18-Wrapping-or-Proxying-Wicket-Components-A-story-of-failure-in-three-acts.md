---
layout: post
comments: true
title: 'Wrapping or Proxying Wicket Components - A story of failure in three acts '
tags:
- Aspect oriented programming
- delegate pattern
- dependency injection
- google guice
- javassist
- proxy pattern
- software development
- wicket-crudr
date: 2012-04-18 13:45:43.000000000 +02:00
---
When working on Wicket CRUDr, I encountered a problem which could be used easily by using a simple wrapper or proxy for existing components. These components are to be created by factory methods and need some additional functionality (like specific implementations of the onModelChanged-methods). Since I wanted to dumb down these factories and didn't want to have everyone implementing new factories to have to know about these, I thought, it would be nice to add the functionality afterwards.


I tried three different approaches and none of them worked so, right now I've got to live without these features. Here is what I tried:

1. Creating a delegating wrapper
2. Using java.lang.Proxy
3. Using AOP (a) by Google Guice and (b) by Javassist

# Creating a delegating wrapper #
Creating the wrapper is easy. Just create an empty class, add a member of the desired type and right-click the members. select *Source -> Generate Delegate Methods...* and implement the interceptors you need. Since the wrapper has to be added to the component-tree (instead of the internal delegate) to work it's magic (i.e. have the interceptors called), is has to extend Component or one of it's subclasses. In my case it had to extend WebComponent. This is no problem since all public and non-final methods are implemented to point at the matching methods of the wrapped object. That's where things start to get ugly. Adding this duo to the component tree leads to massive inconsistencies with all public, non-final methods being redirected to the delegate, which isn't part of the component tree and all other methods being handled by the wrapper (or it's superclass in this case), which is just a dumb WebComponent and not the implementation returned by the factory. Wicket trying to access the parent markup of the delegate (the one not added to the component tree) is one of the least of your problems...

# Using java.lang.Proxy #
This was a real short one. Proxy can't proxy classes and wicket doesn't supply Interfaces. Extracting Interfaces from Wicket classes doesn't help since the Wicket classes don't implement them, preventing you from using proxies created to match those Interfaces in Wicket.

# Using AOP #
The use of Aspect Oriented programming was the next in line. Google Guice would have mandated the creation of an Interceptor, which wasn't an option with the stated goal to provide a set of Wicket-Components to do CRUD operations on models.

Javassist seemed like a good candidate but had to be discarded when there was no way to wrap an existing object instead of creating a new one along with the proxy.

So sadly the conclusion up to now is: The Proxy- or Delegate-Pattern and Wicket-Components don't play nice with each other.