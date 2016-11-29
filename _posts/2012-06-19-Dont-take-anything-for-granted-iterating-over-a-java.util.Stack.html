---
layout: post
title: Don't take anything for granted - iterating over a java.util.Stack
categories:
- Java
- common pitfal
- common pitfall
- j2ee
- java
- java enterprise
- pitfall
- puzzler
- rant
- software development
permalink: "/archives/28-Dont-take-anything-for-granted-iterating-over-a-java.util.Stack.html"
s9y_link: http://wicket-game.gwassist.de/archives/28-Dont-take-anything-for-granted-iterating-over-a-java.util.Stack.html
date: 2012-06-19 20:14:00.000000000 +02:00
---
<p>Don't ever think just because a certain way of doing things seems reasonable or logical to you or anyone else means it's implemented that way.&#160;</p> 
<pre>In <a href="http://en.wikipedia.org/wiki/Computer_science" title="Computer science">computer science</a>, a <strong>stack</strong> is a last in, first out (<a href="http://en.wikipedia.org/wiki/LIFO_%28computing%29" title="LIFO (computing)">LIFO</a>) 
<a href="http://en.wikipedia.org/wiki/Abstract_data_type" title="Abstract data type">abstract data type</a> and linear <a href="http://en.wikipedia.org/wiki/Data_structure" title="Data structure">data structure</a>.</pre> 
<p align="right">from wikipedia </p> 
<p>The key characteristic here is &quot;last in, first out&quot;. So, when I do something like this:</p> 
<pre style="color: #000000;">Stack<span style="color:#555555; ">&lt;</span><span style="color:#575757; font-weight:bold; ">String</span><span style="color:#555555; ">&gt;</span> myStack <span style="color:#555555; ">=</span> new Stack<span style="color:#555555; ">&lt;</span><span style="color:#575757; font-weight:bold; ">String</span><span style="color:#555555; ">&gt;</span><span style="color:#555555; ">(</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
myStack<span style="color:#555555; ">.</span>push<span style="color:#555555; ">(</span><span style="color:#2a2a2a; ">"</span><span style="color:#4c4c4c; ">a</span><span style="color:#2a2a2a; ">"</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
myStack<span style="color:#555555; ">.</span>push<span style="color:#555555; ">(</span><span style="color:#2a2a2a; ">"</span><span style="color:#4c4c4c; ">b</span><span style="color:#2a2a2a; ">"</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
myStack<span style="color:#555555; ">.</span>push<span style="color:#555555; ">(</span><span style="color:#2a2a2a; ">"</span><span style="color:#4c4c4c; ">c</span><span style="color:#2a2a2a; ">"</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
myStack<span style="color:#555555; ">.</span>push<span style="color:#555555; ">(</span><span style="color:#2a2a2a; ">"</span><span style="color:#4c4c4c; ">d</span><span style="color:#2a2a2a; ">"</span><span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
</pre> 
<p>and then &quot;go through&quot; the stack and print every item, I'd expect something very much like <strong>dcba</strong> as the result, pretty much like what I get doing this:

</p> 
<p> </p> 
<pre style="color: #000000;"><span style="color: rgb(87, 87, 87); font-weight: bold;">while</span> <span style="color: rgb(85, 85, 85);">(</span><span style="color: rgb(85, 85, 85);">!</span>myStack<span style="color: rgb(85, 85, 85);">.</span>empty<span style="color: rgb(85, 85, 85);">(</span><span style="color: rgb(85, 85, 85);">)</span><span style="color: rgb(85, 85, 85);">)</span> <span style="color: rgb(85, 85, 85);">{</span>
    System<span style="color: rgb(85, 85, 85);">.</span>out<span style="color: rgb(85, 85, 85);">.</span>print<span style="color: rgb(85, 85, 85);">(</span>myStack<span style="color: rgb(85, 85, 85);">.</span>pop<span style="color: rgb(85, 85, 85);">(</span><span style="color: rgb(85, 85, 85);">)</span><span style="color: rgb(85, 85, 85);">)</span><span style="color: rgb(85, 85, 85);">;</span>
<span style="color: rgb(85, 85, 85);">}</span></pre> 
<p>But completely different from what I get doing this:</p> 
<pre style="color: #000000;"><span style="color:#575757; font-weight:bold; ">for</span> <span style="color:#555555; ">(</span><span style="color:#575757; font-weight:bold; ">String</span> item<span style="color:#555555; ">:</span> myStack<span style="color:#555555; ">)</span> <span style="color:#555555; ">{</span>
    System<span style="color:#555555; ">.</span>out<span style="color:#555555; ">.</span>print<span style="color:#555555; ">(</span>item<span style="color:#555555; ">)</span><span style="color:#555555; ">;</span>
<span style="color:#555555; ">}</span>
</pre> 
<p>This prints <strong>abcd</strong>, which is definitely surprising, at least to me and it's so surprising that it fools me every time I use this class. A stack a such should offer two functions, push and pop and maybe a peek-method as well. It's meant to store data and return it in reverse order while destroying itself. I'm not sure if I'd expect the foreach to destroy my stack but I' pretty sure, this shouldn't implement a hidden reverse or invert method.
</p>
