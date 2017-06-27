---
layout: post
tags:
- future
- devoxx 2016
- language
categories:
- software development
- java
- language
title: 'To stop the suffering (working title) Project Valhalla' 
date: 2016-12-29 22:17:17.000000000 +02:00
logo: assets/futures_talk.jpg
---


"Project Valhalla aims to reboot the layout in memory." That was the main thesis when Brian Goetz talked about Project Valhalla at the Devoxx Belgium conference in 2016. While this differs from the original mission statement that was issued when the project was started in //TODO year, most of the other parts of this statement were already covered in his talk on the future of Java.


On the other hand this might indicate a shift in priorities inside the project I can only speculate about. With the current improvements in Hardware the original decisions for Java's memory layout might start to become a burden that needs to be lifted. The relative cost of a fetch vs. arithmetically getting the data increased by 200-1000x (30 years ago, both were about 4 cycles each, now a cache miss costs in the order of 300 cycles, in typical processors, the cost of an arithmetic operations went down to 0.25 cycles). So the ability of the JVM to take care of all of the memory issues and free the developert think about the real problems to solve is still a luxury that makes Java stand out among many of the other withspread languages, but it's a luxury that needs to be afforded and affordable.

There seem to be three solutins to this issue, two obvious and one lesser obvious one. The two obvious ones, dropping memory management back into the developers lap and imroving the JVM to drive down the cost of machine managed memory are pretty hard to impossible to archive since Java always takes care to be backward compatible and already is pretty good at handling memory within the decisions made all those years ago. The third solution is to rethink these decisions and give the developer some power to influence the memory layout of his application.

The main issues with the current layout are indirections or pointer fetches.
//TODO illustration
With the current state of Generics, it's impossible to crate a map of primitive int values. To improve this is another goal of Project valhalla from the original mission statement, but one that was already covered in the talk (and is already covered here //TODO link). A map of Integers is nothing but a big (neatly organized) pile of pointers. To follow these pointers has become more and more expensive (relatively), so many a developer found himself implementing his own map of primitive ints as two arrays to avoid boxing and unboxing as well as additional pointer fetches, with all the overhead of reimplementing resizing the arrays and all the other stuff HashMap does for you (and in most cases negating every perfomance gain by doing so poorly).

Pointer fetches, indirections and memory locality featured heavily in many talks at the conference. So heavily that there were even tweets mocking the fact that, at a conference for a language that manages memory for you almost every other talk mentioned memory layout issues.

Since the costs were about the same when the Java memory structure was invented and the costs now differ by several orders of magnitude, it's a good (and true) guess, that the decisions made all those years ago are not the best ones for modern hardware. That's why there is Project Valhalla and that's also the reason why there was close to no visible progress between the talks about the project at the conference and the one hld two years prior to that. It's an important issue but also a very complex one.

The reason for most of the pointer fetches needed in Java is object identity, which is needed for polymorphism, mutability and locking but not all objects or classes need that. Of course, all objects pay the price. Simple value objects, data holders and other stateless POJOs seldom need polymorphism, often don't want mutability and are rarely used for locking and if they are they can usuallly be replaced easily. So being an object isn't exactly the best choice for them but right now in Java it's the only one.  

The cost of being an object is twofold. For one there is the memory density of an wrapper that's lower than the memory density of the matching primitive and that's also true for other classes. For example the famous Point class that consists of two final integers representing the x and y coordinates. The memory consumption of a Point object adds up to 5 words, 2 words of payload, two words of object header, one word of pointer to the object, which is an overhead of 150%. True, bigger objects suffer a smaller relative overhead but the true cost is in memory locality, which is lost as soon as there are pointers involved.

This might be no issue while the datasets are small but as soon as you start to crunch serious amounts of numbers, like in BigData, this becomes an issue and a big one too.

Developers will and do ruin their code for performance reasons wether or not they got real performance issues, metrics or requirements (see the example with the two arrays) just because they happen to know that the other way is slower. Making their code less readable, more error prone, less "doing what it says it does" and thus less maintainable. The behaviour of developers all over the globe stems from a bad choice that doesn't even have to be taken in most cases: "Abstraction or perfomance, pick one" is often asked aloud and even more often silent in your head as you work on your code. But usually you don't even have any quality metrics that can verify that your loss of abstraction is even delivering a performance gain and even if there are metrics in place, if you need to squeeze out these miniseconds by sacrificing abstraction, readability and maintainability, you're most likely not working on one of the projects that makes up the vast majority of todays Java code.

To reduce this felt need for optimization even further, Project Valhalla aims to provide the developer with means to give the needed hints to the VM where mutability and locking and thus identity can be skipped and the cost of memory indirection can be avoided. 
The VM can't figure out if a certain data structure will never be used in locking or never needs to be mutable and thus never rely on identity. The VM needs the help of the developer to keep him from taking that decision.

That shouldn't be to hard, so what took oracle more than two years (as almost the same talk was held two years before)? There is a lot of devil in the detail especially with generics and the fact that including value classes into generics would include primitives a well and excluding them would be pretty lame (Brian Goetz' own words). Including them and making them full members of the Java Language and not something that's welded on as an afterthought will further weaken the idea of everything as an object, which already isn't true for primitives. Generics including value classes will have some functionality of todays generics missing as the generic type could be a value which wouldn't support locking for instance. So there will be a new syntax needed to distinguish the new generics from old ones because there will be no flag day where everyone will have to recompile their code because the old generics aren't working anymore. Additionally the is a lot of work to be done in the existing libraries so that Intream can become Stream<int> and TiIntFunction<T> can be Function<T, int>.

But a new type of objects and the major overhaul of the generics feature cut deepy into the heart of the VM. They need new bytecode sice an ArrayList<int> will need to be backed by a real int[] to have any effect. The improved generics need to be deeply ingrained into the Vm as well to make them play nicely with the existing generics, wildcards, diamonds and raw types. There are (still) decisions to be made like "Will value types share a common root type?". There are a lot of signatures to be touched and checked, a lot of had crafted code like IntStream has to be checked and eventually moved to the new fuctionality and last but not least what about all the libraries in existence, they will have to change to support that feature as well and might need help or code to do the migration.

With the introduction of thoses extended generics and value objects the temptation to uglify your code by manual unrolling the abstraction layer into primitives will be reduced as the VM can finally take the hints, inline, value objects, save object headers, reduce the garbage collectors workload and skip the indirection that's needed in todays memory layout.


