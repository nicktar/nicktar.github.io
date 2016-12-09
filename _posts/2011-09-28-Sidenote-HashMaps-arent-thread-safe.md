---
layout: post
comments: true
title: 'Sidenote: HashMaps aren''t thread-safe'
tags:
- common pitfall
- java
- map
- multithreaded
- pitfall
- software development
- thread-safe
date: 2011-09-28 14:34:39.000000000 +02:00
---
It's stated in the docs but it seems like everyone has to run into this at least once....

> The `HashMap` class is roughly equivalent to `Hashtable`, except that it is unsynchronized and permits nulls.


Being unsynchronized doesn't by default flag something as not thread-safe but it raises at least some concerns. In case of the `HashMap` these are valid. When adding entries to the map it might be necessary to adapt the map's size and to do so, the `HashMap` redistributes the entries into new buckets. Adding more entries during this process might screw the whole map, while retrieving data during redistribution might yield wrong values or no values at all.

The easiest way around this is the use of `Hashtable`s where ever you need to store data in a `HashMap`py way in a multithreaded environment. But this only works if you can live without `null` keys and values. The other solution is `Collections.synchronizedMap(new HashMap());`, but being synchronized, this baby is slow as hell. Some middle ground can be archived by using `ConcurrentMap` if you can live with the fact that you might under certain circumstances get data that's some milliseconds old. 
