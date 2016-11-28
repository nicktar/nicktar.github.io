---
layout: post
title: Testing an AjaxCheckBox in WicketTester
categories:
- Apache Wicket
- apache
- apache wicket
- formtester
- java
- software development
- unit test
- unittest
- wickettester
permalink: "/archives/12-Testing-an-AjaxCheckBox-in-WicketTester.html"
s9y_link: http://wicket-game.gwassist.de/archives/12-Testing-an-AjaxCheckBox-in-WicketTester.html
date: 2011-04-03 15:49:10.000000000 +02:00
---
<p>Setting up a unit test for a form containing an AjaxCheckBox seems pretty straightforward and simple. So simple that it's easy to forget two essential steps...</p> 
<pre style='color:#000000;'><span style='color:#2e2e2e; '>01</span> @Test
02 <span style='color:#575757; font-weight:bold; '>public</span> void testDeSelectingCheckbox() <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>03</span>     WicketTester tester <span style='color:#555555; '>=</span> <span style='color:#575757; font-weight:bold; '>new</span> WicketTester <span style='color:#555555; '>(</span> <span style='color:#575757; font-weight:bold; '>new</span> WicketApplication<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>04</span>     <span style='color:#575757; font-weight:bold; '>final</span> HomePage homePage <span style='color:#555555; '>=</span> <span style='color:#575757; font-weight:bold; '>new</span> HomePage<span style='color:#555555; '>(</span><span style='color:#575757; font-weight:bold; '>true</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>05</span>     tester<span style='color:#555555; '>.</span>startPage<span style='color:#555555; '>(</span><span style='color:#575757; font-weight:bold; '>new</span> ITestPageSource<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span> <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>06</span> 
<span style='color:#2e2e2e; '>07</span>         <span style='color:#575757; font-weight:bold; '>public</span> Page getTestPage<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span> <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>08</span>             <span style='color:#575757; font-weight:bold; '>return</span> homePage<span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>09</span>         <span style='color:#555555; '>}</span>
<span style='color:#2e2e2e; '>10</span>     <span style='color:#555555; '>}</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>11</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertTrue<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"Initial value should be true."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getValue<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>12</span>     tester<span style='color:#555555; '>.</span>executeAjaxEvent<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"form:box"</span><span style='color:#555555; '>,</span><span style='color:#4c4c4c; '>"onclick"</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>14</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertTrue<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"onUpdate wasn't called."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getOnUpdateExecuted<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>15</span>     tester<span style='color:#555555; '>.</span>assertLabel<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"text"</span><span style='color:#555555; '>,</span><span style='color:#4c4c4c; '>"false"</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>16</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertFalse<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"Final value should be false."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getValue<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>17</span> <span style='color:#555555; '>}</span>
</pre><p>
At a first glance this test looks ok, and it even runs perfectly. While this one, looking very similar, fails miserably</p> 
<pre style='color:#000000;'><span style='color:#2e2e2e; '>01</span> @Test
02 <span style='color:#575757; font-weight:bold; '>public</span> void testSelectingCheckbox() <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>03</span>     WicketTester tester <span style='color:#555555; '>=</span> <span style='color:#575757; font-weight:bold; '>new</span> WicketTester<span style='color:#555555; '>(</span><span style='color:#575757; font-weight:bold; '>new</span> WicketApplication<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>04</span>     <span style='color:#575757; font-weight:bold; '>final</span> HomePage homePage <span style='color:#555555; '>=</span> <span style='color:#575757; font-weight:bold; '>new</span> HomePage<span style='color:#555555; '>(</span><span style='color:#575757; font-weight:bold; '>false</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>05</span>     tester<span style='color:#555555; '>.</span>startPage<span style='color:#555555; '>(</span><span style='color:#575757; font-weight:bold; '>new</span> ITestPageSource<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span> <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>06</span> 
<span style='color:#2e2e2e; '>07</span>         <span style='color:#575757; font-weight:bold; '>public</span> Page getTestPage<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span> <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>08</span>             <span style='color:#575757; font-weight:bold; '>return</span> homePage<span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>09</span>         <span style='color:#555555; '>}</span>
<span style='color:#2e2e2e; '>10</span>     <span style='color:#555555; '>}</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>11</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertFalse<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"Initial value should be false."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getValue<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>12</span>     tester<span style='color:#555555; '>.</span>executeAjaxEvent<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"form:box"</span><span style='color:#555555; '>,</span><span style='color:#4c4c4c; '>"onclick"</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>13</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertFalse<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"onUpdate wasn't called."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getOnUpdateExecuted<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>14</span>     tester<span style='color:#555555; '>.</span>assertLabel<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"text"</span><span style='color:#555555; '>,</span><span style='color:#4c4c4c; '>"true"</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>15</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertTrue<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"Final value should be true."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getValue<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>16</span> <span style='color:#555555; '>}</span>
</pre><p>
After some head-scratching and even considering a bug in WicketTester one could spot 2 little lines missing from both test cases rendering them both useless since the value of the checkbox' model will always be false after the test is run.</p> 
<pre style='color:#000000;'><span style='color:#2e2e2e; '>01</span> @Test
02 <span style='color:#575757; font-weight:bold; '>public</span> void testSelectingCheckbox() <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>03</span>     WicketTester tester <span style='color:#555555; '>=</span> <span style='color:#575757; font-weight:bold; '>new</span> WicketTester<span style='color:#555555; '>(</span><span style='color:#575757; font-weight:bold; '>new</span> WicketApplication<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>04</span>     <span style='color:#575757; font-weight:bold; '>final</span> HomePage homePage <span style='color:#555555; '>=</span> <span style='color:#575757; font-weight:bold; '>new</span> HomePage<span style='color:#555555; '>(</span><span style='color:#575757; font-weight:bold; '>false</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>06</span>     tester<span style='color:#555555; '>.</span>startPage<span style='color:#555555; '>(</span>newITestPageSource<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span> <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>07</span> 
<span style='color:#2e2e2e; '>08</span>         <span style='color:#575757; font-weight:bold; '>public</span> Page getTestPage<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span> <span style='color:#555555; '>{</span>
<span style='color:#2e2e2e; '>09</span>             <span style='color:#575757; font-weight:bold; '>return</span> homePage<span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>10</span>         <span style='color:#555555; '>}</span>
<span style='color:#2e2e2e; '>11</span>     <span style='color:#555555; '>}</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>12</span>     FormTester formTester <span style='color:#555555; '>=</span> tester<span style='color:#555555; '>.</span>newFormTester<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"form"</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>13</span>     formTester<span style='color:#555555; '>.</span>setValue<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"box"</span><span style='color:#555555; '>,</span> <span style='color:#575757; font-weight:bold; '>true</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>14</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertFalse<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"Initial value should be false."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getValue<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>15</span>     tester<span style='color:#555555; '>.</span>executeAjaxEvent<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"form:box"</span><span style='color:#555555; '>,</span><span style='color:#4c4c4c; '>"onclick"</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>16</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertTrue<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"onUpdate wasn't called."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getOnUpdateExecuted<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>17</span>     tester<span style='color:#555555; '>.</span>assertLabel<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"text"</span><span style='color:#555555; '>,</span><span style='color:#4c4c4c; '>"true"</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>18</span>     org<span style='color:#555555; '>.</span>junit<span style='color:#555555; '>.</span>Assert<span style='color:#555555; '>.</span>assertTrue<span style='color:#555555; '>(</span><span style='color:#4c4c4c; '>"Final value should be true."</span><span style='color:#555555; '>,</span> homePage<span style='color:#555555; '>.</span>getValue<span style='color:#555555; '>(</span><span style='color:#555555; '>)</span><span style='color:#555555; '>)</span><span style='color:#555555; '>;</span>
<span style='color:#2e2e2e; '>19</span> <span style='color:#555555; '>}</span>
</pre> 
<p>
The magic lies within the lines 12 and 13. Even if you've got no obvious value to set, when testing forms and formcomponents, you need to use FormTester no matter what.

Simple, easy and true but equaly easy to forget and thus wasting a couple of hours, trying to figure out what's wrong.
</p>
