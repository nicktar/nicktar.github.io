---
layout: post
comments: true
title: How to change css attributes and disable form elements on the fly
tags:
- apache wicket
- css
categories:
- software development
- java
- wicket
date: 2011-05-08 12:03:59.000000000 +02:00
---
Wicket makes it easy to manipulate CSS attributes on the fly. The most obvious solution would be to overwrite the onComponentTag method and add the logic there. It's a very powerful solution as you can virtually do anything to the tag. But writing html fragments directly from my Java code is something that smells like JSPs and I don't like that smell.


One of the greatest features of wicket is the separation of logic and data (code and html) and the requirement can be met without ruining that.

Wicket offers 2 powerful classes to handle these. One is the [SimpleAttributeModifier] [1], "a lightweight version of the [attribute modifier] [2]". I never had to use the AttributeModifier as the simple version always was enough. The other one is the [AttributeAppender] [3].

The main difference between these two is how they react to existing attributes. The SimpleAttributeModifier replaces existing attributes of the same type (e.g. replaces the value of the class-attribute), while the AttributeAppender adds to it using a constructor-defined separator (like adding another class or appending more JavaScript to the onClick-attribute).

A slightly different approach seems obvious when a button or other form element needs to be disabled, since Component offers a setEnabled(boolean) method. Unfortunately this method only set's wicket internal values. The JavaDoc suggests to overwrite this method for form elements but this isn't part of the wicket release, so this approach doesn't work. It sure would be easy to subclass the form elements and implement this (possibly using the AttributeAppender) but I favour Composition over Inheritance, so my solution would be to use the AttributeAppender directly when needed. Maybe when using wicket-security or some other framework to enable/disable buttons and links based on roles or principals this might not be the best solution but since I'm currently not using these...

O.K. enough talk... let there be code...

{% highlight java linenos %} 
public class DemoPage extends WebPage {
 
     public DemoPage() {
         Form form = new Form("form");
         add(form);
         final WebMarkupContainer wmc = new WebMarkupContainer("greenText");
         form.add(wmc);
         form.add(new Link("redLink"){
 
             @Override
             public void onClick() {
                 wmc.add(new SimpleAttributeModifier("class", "redText"));
             }});
{% endhighlight %} 

This replaces the class of the WebMarkupContainer (currently "greenText") and sets it to "redText"

{% highlight java linenos %} 
        final Button boldButton = new Button("boldButton"){
 
             @Override
             public void onSubmit() {
                 wmc.add(new AttributeAppender("class", true, new Model<String>("boldText"), " "));
             }};
{% endhighlight %} 

This appends the value of the Model to the class-attribute and adds a new one if it's not already present (that's what the true in the second argument stands for). I could even implement some arcane logic into the Model to compute the new value but that would be beyond the scope of this example. The last argument defines the separator (like " " for class-attributes or ";" for JavaScript).


{% highlight java linenos %} 
         form.add(boldButton);
         Link disabler = new Link("buttonDisabler") {
 
             @Override
             public void onClick() {
                 boldButton.add(new AttributeAppender("disabled", true, new Model<String>("disabled"),
                                " "));                
             }
 
         };
         form.add(disabler);
     }

}
{% endhighlight %} 

Note that the correct use of the disabled-attribute is "disabled=disabled", thus the attribute-name and Model value.

and the corresponding HTML

{% highlight html linenos %} 
<html>
<head>
<style>
.redText {
    color: red;
    }
.greenText {
    color: green;
    }
.boldText {
    font-weight: bold;
    }
</style>
</head>
<body>
<form wicket:id="form">
<div class="greenText" wicket:id="greenText">This is Green.</div><br />
<a href="" wicket:id="redLink">Make it red</a><br />
<input type="submit" wicket:id="boldButton" value="Make it bold" /><br />
<a href="" wicket:id="buttonDisabler">Disable the button</a>
</form>
</body>
</html>
{% endhighlight %} 

yeah, ugly I know, but this is here to demonstrate a point, not to win a beauty contest.

[1]: "http://wicket.apache.org/apidocs/1.4/org/apache/wicket/behavior/SimpleAttributeModifier.html"
[2]: "http://wicket.apache.org/apidocs/1.4/org/apache/wicket/AttributeModifier.html"
[3]: "http://wicket.apache.org/apidocs/1.4/org/apache/wicket/behavior/AttributeAppender.html"