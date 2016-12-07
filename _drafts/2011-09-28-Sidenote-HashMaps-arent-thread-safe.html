---
layout: post
title: 'Sidenote: HashMaps aren''t thread-safe'
categories:
- Java
- common pitfal
- java
- map
- multithreaded
- pitfall
- software development
- thread-safe
permalink: "/archives/5-Sidenote-HashMaps-arent-thread-safe.html"
s9y_link: http://wicket-game.gwassist.de/archives/5-Sidenote-HashMaps-arent-thread-safe.html
date: 2011-09-28 14:34:39.000000000 +02:00
---
<p>It's stated in the docs but it seems like everyone has to run into this at least once....</p> 
<blockquote> 
<p>The <tt>HashMap</tt> class is roughly equivalent to <tt>Hashtable</tt>, except that it is unsynchronized and permits nulls.</p> 
</blockquote> 
<p>Being unsynchronized doesn't by default flag something as not thread-safe but it raises at least some concerns. In case of the <tt>HashMap</tt> these are valid. When adding entries to the map it might be necessary to adapt the map's size and to do so, the <tt>HashMap</tt> redistributes the entries into new buckets. Adding more entries during this process might screw the whole map, while retrieving data during redistribution might yield wrong values or no values at all.</p> 
<p> The easiest way around this is the use of <tt>Hashtables</tt> where ever you need to store data in a <tt>HashMap</tt>py way in a multithreaded environment. But this only works if you can live without <tt>null</tt> keys and values. The other solution is <tt>Collections.synchronizedMap(new HashMap());</tt>.</p>
