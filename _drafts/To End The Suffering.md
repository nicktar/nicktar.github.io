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


Project Valhalla aims to reboot the layout in memory

With improvements in hardware the relative cost of a fetch vs. arithmetically getting the data increased by 200-1000x (30 years ago, both were about 4 cycles each, now a cache miss casts in the order of 300 cycles, in typical processors, the cost of an arithmetic operations went down to 0.25 cycles)
Indirections (pointer fetches) are hazardous to performance
-> so many talks mentioned memory indirection as a problem in a language that supposidly keeps you from caring about memory, that there were even tweets about the fact

Since the costs were about the same when the Java memory structure was invented and the costs now differ by several orders of magnitude, it's a good (and true) guess, that the decisions made all those years ago are not the best ones for modern hardware.

The reason for most of the pointer fetches needed in Java is object identity, which is needed for polymorphism, mutability and locking but not all objects or classes need that. Of course, all objects pay the price...

Memory density of point: 2 word payload two word of header and 1 word of pointer, thats 150% overhead and the real cost is the loss of memory locality. Sometimes this doesn't hurt, especially if the datasets are small, but when you want to crunch serious amouts of data, this becomes an issue. 

Developers will and do ruin their code for performance reasons wether or not they got real performance issues, metrics or requirements (2 arrays screenshot) just because they happen to know that the other way is slower. Maiking their code less readable, more error prone, less "doing what it says it does" ant thus less maintainable. Stems from a bad choice that doesn't even have to be taken in most cases: "abstraction or perfomance, pick one"
The VM can't figure out if a certain data structure will never be used in locking or never needs to be mutable and thus never rely on identity. The VM needs the help of the developer to keep him from taking that decision.
values can be inlined

That shouldn't be to hard, so what took oracle more than two years (as almost the same talk was held two years before)? There is a lot of devil in the detail especially with generics and the fact that including value classes into generics would include primitives a well and excluding them would be pretty lame (Brian Goetz' own words). Including them and making them full members of the Java Language and not something that's welded on as an afterthought will further weaken the idea of everything as an object, which already isn't true for primitives. Generics including value classes will have some functionality of todays generics missing as the generic type could be a value which wouldn't support locking for instance. So there will be a new syntax needed to distinguish the new generics from old ones because there will be no flag day where everyone will have to recompile their code because the old generics aren't working anymore. Additionally the is a lot of work to be done in the existing libraries so that Intream can become Stream<int>.