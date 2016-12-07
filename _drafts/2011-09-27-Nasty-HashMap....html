---
layout: post
title: Nasty HashMap...
categories:
- Java
- common pitfall
- equals
- hashcode
- hashmap
- java
- map
- pitfall
- puzzler
- software development
permalink: "/archives/6-Nasty-HashMap....html"
s9y_link: http://wicket-game.gwassist.de/archives/6-Nasty-HashMap....html
date: 2011-09-27 10:17:47.000000000 +02:00
---
<p>... or why hashCode() and equals() should be calculated on immutable parts of your keys only and what happens if you don't.<br /> <br /> Imagine a situation where you've got a Map like this: HashMap. You populate your map, work with your BusinessObjects (lazy load some more values), using the same objects you put into your Map and then you can't find them any more. The keySet of the map contains the object, hashCode and equals affirm that this is the BusinessObject, you want, they are the very same objects as even == returns true but containsKey returns false and get returns null... WTF?</p> 
<p>If at some point you'll get too confused or the occult inner magic of java.util starts to scare you, just skip ahead to the summary.</p> 
<pre style="color: #000000;">01 <span style="color:#575757; font-weight:bold; ">import</span><span style="color:#2f2f2f; "> java</span><span style="color:#555555; ">.</span><span style="color:#2f2f2f; ">util</span><span style="color:#555555; ">.</span><span style="color:#2f2f2f; ">HashMap</span><span style="color:#555555; ">;</span>
02 <span style="color:#575757; font-weight:bold; ">import</span><span style="color:#2f2f2f; "> java</span><span style="color:#555555; ">.</span><span style="color:#2f2f2f; ">util</span><span style="color:#555555; ">.</span><span style="color:#2f2f2f; ">Map</span><span style="color:#555555; ">;</span>
03 <span style="color:#575757; font-weight:bold; ">import</span><span style="color:#2f2f2f; "> junit</span><span style="color:#555555; ">.</span><span style="color:#2f2f2f; ">framework</span><span style="color:#555555; ">.</span><span style="color:#2f2f2f; ">TestCase</span><span style="color:#555555; ">;</span>
04 
05 <span style="color:#575757; font-weight:bold; ">public</span> <span style="color:#575757; font-weight:bold; ">class</span> Demo <span style="color:#575757; font-weight:bold; ">extends</span> TestCase <span style="color:#555555; ">{</span>
06     <span style="color:#575757; font-weight:bold; ">public</span> <span style="color:#575757; font-weight:bold; ">void</span> testMap<span style="color:#555555; ">(</span><span style="color:#555555; ">)</span> <span style="color:#555555; ">{</span>
07         Map<span style="color:#555555; ">&lt;</span>DomainObject<span style="color:#555555; ">,</span> <span style="color:#575757; font-weight:bold; ">String</span><span style="color:#555555; ">&gt;</span> map <span style="color:#555555; ">=</span> <span style="color:#575757; font-weight:bold; ">new</span> HashMap<span style="color:#555555; ">&lt;</span>DomainObject<span style="color:#555555; ">,</span> <span style="color:#575757; font-weight:bold; ">String</span><span style="color:#555555; ">&gt;</span><span style="color:#555555; ">(</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
08         DomainObject sb <span style="color:#555555; ">=</span> <span style="color:#575757; font-weight:bold; ">new</span> DomainObject<span style="color:#555555; ">(</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
09         map<span style="color:#555555; ">.</span>put<span style="color:#555555; ">(</span>sb<span style="color:#555555; ">,</span> <span style="color:#4c4c4c; ">"Some value"</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
10         <span style="color:#575757; font-weight:bold; ">System</span><span style="color:#555555; ">.</span>out<span style="color:#555555; ">.</span>println<span style="color:#555555; ">(</span>map<span style="color:#555555; ">.</span>containsKey<span style="color:#555555; ">(</span>sb<span style="color:#555555; ">)</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
11         sb<span style="color:#555555; ">.</span>value <span style="color:#555555; ">=</span> <span style="color:#4c4c4c; ">"Some Text"</span><span style="color:#555555; ">;</span>
12         <span style="color:#575757; font-weight:bold; ">System</span><span style="color:#555555; ">.</span>out<span style="color:#555555; ">.</span>println<span style="color:#555555; ">(</span>map<span style="color:#555555; ">.</span>containsKey<span style="color:#555555; ">(</span>sb<span style="color:#555555; ">)</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
13     <span style="color:#555555; ">}</span>
14     <span style="color:#575757; font-weight:bold; ">private</span> <span style="color:#575757; font-weight:bold; ">static</span> <span style="color:#575757; font-weight:bold; ">class</span> DomainObject <span style="color:#555555; ">{</span>
15         <span style="color:#575757; font-weight:bold; ">public</span> <span style="color:#575757; font-weight:bold; ">String</span> value <span style="color:#555555; ">=</span> <span style="color:#575757; font-weight:bold; ">null</span><span style="color:#555555; ">;</span>
16         <span style="color:#555555; ">@</span>Override
17         <span style="color:#575757; font-weight:bold; ">public</span> <span style="color:#575757; font-weight:bold; ">int</span> hashCode<span style="color:#555555; ">(</span><span style="color:#555555; ">)</span> <span style="color:#555555; ">{</span>
18             <span style="color:#575757; font-weight:bold; ">final</span> <span style="color:#575757; font-weight:bold; ">int</span> prime <span style="color:#555555; ">=</span> <span style="color:#2e2e2e; ">31</span><span style="color:#555555; ">;</span>
19             <span style="color:#575757; font-weight:bold; ">int</span> result <span style="color:#555555; ">=</span> <span style="color:#2e2e2e; ">1</span><span style="color:#555555; ">;</span>
20             result <span style="color:#555555; ">=</span> prime <span style="color:#555555; ">*</span> result <span style="color:#555555; ">+</span> <span style="color:#555555; ">(</span><span style="color:#555555; ">(</span>value <span style="color:#555555; ">=</span><span style="color:#555555; ">=</span> <span style="color:#575757; font-weight:bold; ">null</span><span style="color:#555555; ">)</span> <span style="color:#555555; ">?</span> <span style="color:#2e2e2e; ">0</span> <span style="color:#555555; ">:</span> value<span style="color:#555555; ">.</span>hashCode<span style="color:#555555; ">(</span><span style="color:#555555; ">)</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
21             <span style="color:#575757; font-weight:bold; ">return</span> result<span style="color:#555555; ">;</span>
22         <span style="color:#555555; ">}</span>
23         <span style="color:#555555; ">@</span>Override
24         <span style="color:#575757; font-weight:bold; ">public</span> <span style="color:#575757; font-weight:bold; ">boolean</span> equals<span style="color:#555555; ">(</span><span style="color:#575757; font-weight:bold; ">Object</span> obj<span style="color:#555555; ">)</span> <span style="color:#555555; ">{</span>
25             <span style="color:#575757; font-weight:bold; ">if</span> <span style="color:#555555; ">(</span><span style="color:#575757; font-weight:bold; ">this</span> <span style="color:#555555; ">=</span><span style="color:#555555; ">=</span> obj<span style="color:#555555; ">)</span>
26                 <span style="color:#575757; font-weight:bold; ">return</span> <span style="color:#575757; font-weight:bold; ">true</span><span style="color:#555555; ">;</span>
27             <span style="color:#575757; font-weight:bold; ">if</span> <span style="color:#555555; ">(</span>obj <span style="color:#555555; ">=</span><span style="color:#555555; ">=</span> <span style="color:#575757; font-weight:bold; ">null</span><span style="color:#555555; ">)</span>
28                 <span style="color:#575757; font-weight:bold; ">return</span> <span style="color:#575757; font-weight:bold; ">false</span><span style="color:#555555; ">;</span>
29             <span style="color:#575757; font-weight:bold; ">if</span> <span style="color:#555555; ">(</span>getClass<span style="color:#555555; ">(</span><span style="color:#555555; ">)</span> <span style="color:#555555; ">!</span><span style="color:#555555; ">=</span> obj<span style="color:#555555; ">.</span>getClass<span style="color:#555555; ">(</span><span style="color:#555555; ">)</span><span style="color:#555555; ">)</span>
30                 <span style="color:#575757; font-weight:bold; ">return</span> <span style="color:#575757; font-weight:bold; ">false</span><span style="color:#555555; ">;</span>
31             DomainObject other <span style="color:#555555; ">=</span> <span style="color:#555555; ">(</span>DomainObject<span style="color:#555555; ">)</span> obj<span style="color:#555555; ">;</span>
32             <span style="color:#575757; font-weight:bold; ">if</span> <span style="color:#555555; ">(</span>value <span style="color:#555555; ">=</span><span style="color:#555555; ">=</span> <span style="color:#575757; font-weight:bold; ">null</span><span style="color:#555555; ">)</span> <span style="color:#555555; ">{</span>
33                 <span style="color:#575757; font-weight:bold; ">if</span> <span style="color:#555555; ">(</span>other<span style="color:#555555; ">.</span>value <span style="color:#555555; ">!</span><span style="color:#555555; ">=</span> <span style="color:#575757; font-weight:bold; ">null</span><span style="color:#555555; ">)</span>
34                     <span style="color:#575757; font-weight:bold; ">return</span> <span style="color:#575757; font-weight:bold; ">false</span><span style="color:#555555; ">;</span>
35             <span style="color:#555555; ">}</span> <span style="color:#575757; font-weight:bold; ">else</span> <span style="color:#575757; font-weight:bold; ">if</span> <span style="color:#555555; ">(</span><span style="color:#555555; ">!</span>value<span style="color:#555555; ">.</span>equals<span style="color:#555555; ">(</span>other<span style="color:#555555; ">.</span>value<span style="color:#555555; ">)</span><span style="color:#555555; ">)</span>
36                 <span style="color:#575757; font-weight:bold; ">return</span> <span style="color:#575757; font-weight:bold; ">false</span><span style="color:#555555; ">;</span>
37             <span style="color:#575757; font-weight:bold; ">return</span> <span style="color:#575757; font-weight:bold; ">true</span><span style="color:#555555; ">;</span>
38         <span style="color:#555555; ">}</span>
39     <span style="color:#555555; ">}</span>
40 <span style="color:#555555; ">}</span>
41 </pre> 
<p>Question: What gets printed? (Solution hidden behind the &quot;Continue Reading&quot; link)</p> 
<p>To understand what's going on, one has to dive into the inner workings of HashMap... The HashMap is used to store key value pairs but it does so by combining them into an Entry-object containing both objects and stores these in an array. So when you call put on an HashMap (for simplicity assuming your key isn't null) first the hashCode() function of your key is called. Then HashMap works it's magic. It moves the hash to the left by 9 bits (multiplies with 512 and might switch the sign of the number a couple of times. Then the result is complemented (each bit shifted) and added to the original hash value. Then it shifts the result (including the sign) to the right by 14 bits, adding 0 to the left side and sets the intermediate result to a bitwise xor of this shifted value and the sum of the last step. Then it repeats the first step but shifting only by 4 bits (multiplies with 16) and omitting the compliment and repeats step 2 with a right shift of 10 bits.</p> 
<p>OK, that should leave everyone (including me) confused. Let's try to shed some light...<br /> Example:<br /> The hashCode-function of your object returns 31 (a very plain object using a very plain hashCode implementation).</p> 
<pre style="color: #000000;">int h = 31<span style="color:#555555; ">;</span>
System.out.println(h + " - " + Integer.toBinaryString(h))<span style="color:#555555; ">;</span> <span style="color:#696969; ">// 31 - 11111</span>
h += ~(h &lt;&lt; 9)<span style="color:#555555; ">;</span>
System.out.println(h + " - " + Integer.toBinaryString(h))<span style="color:#555555; ">;</span> <span style="color:#696969; ">// -15842 - 11111111111111111100001000011110</span>
h ^=  (h &gt;&gt;&gt; 14)<span style="color:#555555; ">;</span>
System.out.println(h + " - " + Integer.toBinaryString(h))<span style="color:#555555; ">;</span> <span style="color:#696969; ">// -246303 - 11111111111111000011110111100001</span>
h ^=  (h &gt;&gt;&gt; 10)<span style="color:#555555; ">;</span>
System.out.println(h + " - " + Integer.toBinaryString(h))<span style="color:#555555; ">;</span> <span style="color:#696969; ">// -3947794 - 11111111110000111100001011101110</span>
</pre> 
<p>That leaves us with an internal hash of -3947794 and no idea what it's good for. But the HashMap isn't done yet. I computes an index based on this value and a bitwise and of the length of the internal table -1. Starting from that index the map iterates through the entries. Yes, these nasty little buggers form a linked list by containing a next-reference. For each iteration it checks if</p> 
<p>a) the recorded internal hashCode matches the internal hashCode of the new key and<br /> b) the key is identical or equal to the stored key.</p> 
<p>If a matching key is found, the value is replaced. If no matching key is found, it adds the new entity object at the start of the linked list of the computed table index and maybe resizing the table and redistributing the buckets.</p> 
<p>To retrieve a value the key is submitted to the very same steps but since the internal hash isn't recalculated whenever the key-object changes, the changed key yields a different internal hash, and a different internal bucket (that's what the linked lists are) and will not be found.</p> 
<p>Summary:<br />When storing a value to a specific key in a HashMap, the corresponding hashCode is computed and stored. If you later change your key-object in a way that changes it's hashCode, these will no longer match.<br /></p> <br /><a href="http://wicket-game.gwassist.de/archives/6-Nasty-HashMap....html#extended">Continue reading "Nasty HashMap..."</a>
