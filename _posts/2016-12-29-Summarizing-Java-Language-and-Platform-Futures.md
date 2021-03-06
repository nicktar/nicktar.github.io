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
title: 'Summarizing: Java Language and Platform Futures: A Sneak Peek by Brian Goetz' 
date: 2016-12-29 22:17:17.000000000 +02:00
logo: assets/futures_talk.jpg
---
During Devoxx Belgium 2016 Brian Goetz talked about possible upcoming Java features. This is of course highly speculative and Oracle doesn't commit to any of these but it gave an interesting insight into the things that might be coming and how Oracle might address some of the bigger pain points of Java Developers with no promises whatsoever made. 


<img src="{{ "/assets/disclaimer.png" | absolute_url}}" align="center" width="80%" hspace="30px" />
<br clear="all" />

## Introduction ##

Brian Goetz talked about possibly upcoming features explicitly without making any promises or committing on when or even if any of these might happen. I want to walk through the presented ideas one by one.

## The talk in detail ##

### Base Principles ###

<img src="{{ "assets/futures_talk.jpg" | absolute_url}}" align="right" width="30%" />

Some 10 years ago, Graham Hamilton outlined a few core principles to guide the future of Java. These are still valid.

* Reading is more important than writing
  * Code should be a joy to read
  * The language should not hide what is happening
  * Code should do what it seems to do
* Simplicity matters
  * A clear semantic model greatly boosts readability
  * Every "good" feature adds more "bad" weight
  * Sometimes it is best to leave things out
* One language: with same meaning everywhere

Brian stressed the point about leaving things out on multiple points during his talk. From a language perspective it's perfectly OK to let other languages take the lead with new features and follow up with all the lessons learned from them to create a better feature for Java.

So Java will evolve but slowly with a strong focus on evolution rather than revolution and a very conservative approach and a commitment to "do no harm". Features will be added after they're fully understood and have been proven to carry their weight in a way that new features are added as possibilities and not as requirements, thus making it easier to build and maintain reliable programs.

### Expand Type Inference ###

Based on the introduction in Java 5 with 
`List<String> myList = Collections.emptyList();` instead of `List<String> myList = Collections.<String>emptyList();`

Java 7 improved Type inference with the introduction of the diamond operator or in other words Type inference for constructors instead of methods only. Java 8 brought type inference for lambdas. This already saved a lot of boilerplate code but still there are a lot of places where type inference would make the code leaner and more readable without compromising strong static typing. 

The next logical step would be to add type inference for local variables as this also fits well with the idea of having type inference mainly in the implementation but not in any API and you can't get further to the implementation side than local variables.

{% highlight java linenos %}
String sql = "SELECT * FROM blog_posts";
Statement statement = session.prepareStatement(sql);
ResultSet rs = statement.executeQuery();
while (rs.next()) {
    String title = rs.getString(1);
}
{% endhighlight %}
... could become ...
{% highlight java linenos %}
var sql = "SELECT * FROM blog_posts";
var statement = session.prepareStatement(sql);
var rs = statement.executeQuery();
while (rs.next()) {
    var title = rs.getString(1);
}
{% endhighlight %}

This, if implemented, would emphasize the name of the variable over their type. All the names line up to the left and more often than not the name of the variable and maybe a really short glance at the right side of the assignment will tell you everything you might need to know about the variable. Most likely any IDE will still carry and display the inferred type information anyway. 


### Boilerplate ###

Java (rightfully) has a bad reputation of being overly verbose and boilerplate heavy. Reducing the amount of boilerplate code needed for an application is an ongoing and never-ending effort that, while improving the overall quality also highlights the areas that are still heavy on boilerplate.

One target for boilerplate reduction might be state-driven methods for domain objects, which is a fancy way of saying constructors, equals, hashCode, compareTo and serialization for data containers. It's a lot of code that can easily be generated by the IDE and is thus easily overlooked when changing the container like adding another value that then doesn't show up in toString or equals and hashCode. Because it's usually generated, it's often ignored in code reviews and unit tests (who in his right mind wants to write unit tests covering all branches of a big classes equals method?). Additionally, generating these methods only helps writing them, not reading and to find out if it's a usual generated method or a special handcrafted one, you still need to read it. Tools like lombok help with this but add an additional layer of hidden magic to the project.

Since these objects are basically stateless and dumb data holders without any logic, why should we clutter our code base with all this generated noise if it's basically the same over and over again for every class?

{% highlight java %}
class Point {
    final int x;
    final int y;
}
{% endhighlight %}

That's all there is to say about this class. Everything else is just noise.

Wouldn't it be nice to be able to just write

{% highlight java %}
class Point (int x, int y) {}
{% endhighlight %}

and have everything else being provided by the compiler, while being able to override every method with a handcrafted one? This would highlight the special parts of a class (if there are any). If implemented at all and in that particular way there is a lot of stuff to decide once you move away from the most basic examples. How should the generated methods treat object equality? Should they use equals or object identity? What about Arrays or stuff like Lists? Sure you will be able to override any of the provided methods simply by manually implementing them but failing to come up with sensible defaults ruins the complete feature.

In addition to reducing the amount of code needed to create a class it would allow a way to declaratively mark a class and their objects as domain objects. But in everydays life, this is a relatively small win compared to the reduction in code (and thus opportunities for errors to occur).

### Improved Switch Statement ###
Todays switch statement is very limited. I can only handle a  select elite group of classes like enums, Integers, nowadays Strings a a few others. Additionally it can only check for constant equality, which is quite restraining on it's own. And the third major limiting factor is the limit to statements in the case block where expressions might be a nice to have feature. On the other hand, switches can be much faster and way more readable than huge blocks of ifs and else ifs. Today, many use cases where switches would be handy but can't be used due to these limitations are realised using the Visitor pattern which solves many problems but is usually neither very fast nor readable and often quite hard to understand and maintain. Many of these cases where we fall back to the visitor pattern could be eliminated with an improved or extended switch statement.

The solution to this that is requested by most is "Type-Switch" since it takes away one single pain point. But even if they ask for, most of these people don't really want a Type-Switch. It's only the first thing that comes to mind. What they really want is a more powerful switch and that might come in form of "Pattern Matching" as it is known from Scala and other functional languages. It would take away the pain from switch, would include everything, we want to do with Type-Switch and would even cover most use cases for Visitor.

So imagine the following code block as it is found in many frameworks whenever we can't be sure about what kind of value we just got supplied or we just found.

{% highlight java linenos %}
public String convert(Object o) {	
    String result = "undefined";	

    if (o instanceof Integer) {		
        Integer i = (Integer)o;		
        result = String.format("Integer found: %d", i);	
    } else if (o instanceof Long) {		
        Long l = (Long)o;		
        result = String.format("Long found: %d", l);	
    } else if (o instanceof Float) {		
        Float f = (Float)o;		
        result = String.format("Float found: %f", f);	
    } else if (o instanceof Double) {		
        Double d = (Double)o;		
        result = String.format("Double found: %f", d);	
    } else if (o instanceof Character) {				
		
        //yadda yadda yadda 
        //repeat for all the other needed types	
		
    } else if (o instanceof String) {		
        String  s = (string)o;		
        result = String.format("String found: %s", s);	
    }	
	
    return result;
}
{% endhighlight %}

We've all seen this type of code, most of us have written code like this and wished if would be easier, less tedious and most of all less error prone.

* I've just checked for ``instanceof``, why the heck do I have to cast?
* If I botch one of these blocks (casting wrong, forgetting the assignment), will someone (i.e. the compiler) catch me? Not the way this is written, assigning the default value at the beginning even takes out definite assignment analysis. And if it's an edge case, no one will notice until it's too late.
* It's slow. This code operates in O(n) while switch might even reach O(1).
* It's not really readable. You've got to parse the whole block to see what types are handled and if one is handles differently, you might not even notice
* It's just an awful lot of code for very little effect.

### Let's see how this might look like with Type-Switch ###
{% highlight java linenos %}
public String convert(Object o) {	
    String result;	

    switch (o) {
    case Integer i: 		
        result = String.format("Integer found: %d", i);
        break;	
    case Long l:		
        result = String.format("Long found: %d", l);
        break;	
    case Float f:		
        result = String.format("Float found: %f", f);
        break;	
    case Double d:
        result = String.format("Double found: %f", d);
        break;	
    case Character c:				
		
        //yadda yadda yadda repeat for all the other needed types	
		
    case String s:
        result = String.format("String found: %s", s);
        break;
    default :
        result = "undefined";
        break;	
    }	
	
    return result;
}
{% endhighlight %}

So this switch would test if o is an instance of a certain class, cast o to that class and assign it to a locally scoped variable. This is better than before but still a lot of code and it's not only a Type Switch but it's already more than a simple Type Switch, it's a pattern. It combines an `instanceof` check, typecasts the variable and assigns the result to a new variable. That's far beyond the scope of a simple Type Switch. 

It reduces the amount of code, makes it clear, that the same test is done for each arm and it potentially reduced the time complexity from O(n) to O(1).

### This could be even better ###
By allowing switch not only over statements like it is right now, but over expressions as well, the whole block might be evaluated as an expression and assigned to the intended variable.

{% highlight java linenos %}
public String convert(Object o) {	
    return switch (o) {
         case Integer i -> String.format("Integer found: %d", i);
         case Long l    -> String.format("Long found: %d", l);
         case Float f   -> String.format("Float found: %f", f);
         case Double d  -> String.format("Double found: %f", d);
             //yadda yadda yadda repeat for all the other needed types	
         case String s  -> String.format("String found: %s", s);
         default        -> "undefined";
     }	
}
{% endhighlight %}

With this, the code is a lot more compact, direct and less error prone.

### There is even more ###

Somewhere further up, we talked about domain objects and how they, by omitting a lot of code would at the same time confirm that they would behave in certain ways and that their representation is tied to their constructor signature. Granting this would allow Java to reverse this operation. Instead of putting in the parameters and creating an Object, we could take an Object and deconstruct in into its parameters. This would allow us to use some kind of constructor pattern that would say, if the object I'm switching over is a data object, decompose it and give me the parameters it would have been constructed with to work on in the switch arm. 

{% highlight java linenos %}
    case Point(var x, var y): 
        result = String.format("Point with coordinates x: %d and y: %d found.", x, y);
{% endhighlight %}
And this in turn would lead to a pretty concise, readable and catchy replacement for a recursive node handling code that is, until this feature maybe will be implemented, a poster child use case for the Visitor pattern. 
{% highlight java linenos %}
public double eval(Node n) {
    return switch (n) {
        case ConstantNode(var node)            -> node;
        case NegateNode(var node)              -> -eval(node);
        case PlusNode(var left, var right)     -> eval(left) + eval(right);
        case MinusNode(var left, var right)    -> eval(left) - eval(right);
        case ProductNode(var left, var right)  -> eval(left) * eval(right);
        case DivisionNode(var left, var right) -> eval(left) / eval(right);
            //...
    }
}
{% endhighlight %}

Basic calculator done...

**If** this would be implemented at some point in the future, it would most definitely not come all at once but small feature by small feature, but according to Brian Goetz "This feature has legs", which still isn't a promise.

## Watch the whole talk ##

[<img src="https://img.youtube.com/vi/oGll155-vuQ/0.jpg" width="30%" align="right">](https://www.youtube.com/watch?v=oGll155-vuQ)Well, I tried to summarize, but I failed, this got extremely lengthy and doesn't even cover the whole talk, which you could watch on YouTube. The remaining parts will be covered in separate articles.

<br clear="all" />

## Credits ##

* The talk was given by Brian Goetz at [Devoxx Belgium] [4] in November 2016.
* The disclaimer was taken from his slides via the video at youtube.
* The photo of him is a cutout from a picture taken at the conference published on [flickr] [2] under a [CC BY-NC-SA 2.0] [3] license.

[2]: https://www.flickr.com/photos/bejug/
[3]: https://creativecommons.org/licenses/by-nc-sa/2.0/
[4]: http://www.devoxx.be