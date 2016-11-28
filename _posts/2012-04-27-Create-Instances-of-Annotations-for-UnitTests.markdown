---
layout: post
title: Create Instances of Annotations (for UnitTests)
categories:
- Java
- annotation
- best practice
- computer
- delegate pattern
- equals
- hashcode
- j2ee
- java
- java enterprise
- jmock
- mocking
- pattern
- software development
- unit test
- unittest
permalink: "/archives/22-Create-Instances-of-Annotations-for-UnitTests.html"
s9y_link: http://wicket-game.gwassist.de/archives/22-Create-Instances-of-Annotations-for-UnitTests.html
date: 2012-04-27 11:47:00.000000000 +02:00
---
<p>Usually you don't have to test Annotations. But you might want to test the effects of your Annotations and (given an Annotation with parameters) this can get quite awkward if you try to write classes or methods for every variant to annotate and test. Given an Annotation like this one:
</p> 
<pre style="color: #000000;">@Retention(RetentionPolicy<span style="color:#2e2e2e; ">.</span>RUNTIME)
@Target(ElementType<span style="color:#2e2e2e; ">.</span>METHOD)
public @interface Lister {
    int position() default -<span style="color:#2e2e2e; ">1</span><span style="color:#555555; ">;</span>
    String headerKey() default ""<span style="color:#555555; ">;</span>
    String displayKey() default ""<span style="color:#555555; ">;</span>
    boolean editInPlace() default false<span style="color:#555555; ">;</span>
    boolean escapeModelString() default true<span style="color:#555555; ">;</span>
    @SuppressWarnings("rawtypes")
    Class&lt;? extends ILabelProvider&gt; customLabelProvider() default ILabelProvider<span style="color:#2e2e2e; ">.</span>class<span style="color:#555555; ">;</span>
}
</pre>there are countless combinations to test. It would be easy if new Lister() would work, but it doesn't (otherwise this article wouldn't make any sense at all). There are several solutions for this... What I'd call a plain core Java solution, an easy workaround, a little hack and my favourite. I'll describe them all so you can take your pick.<br /> 
<p> </p> <br /><a href="http://wicket-game.gwassist.de/archives/22-Create-Instances-of-Annotations-for-UnitTests.html#extended">Continue reading "Create Instances of Annotations (for UnitTests)"</a>
