---
layout: post
comments: true
title: Create Instances of Annotations (for UnitTests)
tags:
- annotation
- best practice
- delegate pattern
- java
- jmock
- mocking 
- pattern
- software development
- unit test
categories:
- software development
- java
- tips & tricks
date: 2012-04-27 11:47:00.000000000 +02:00
comments: true
---
Usually you don't have to test Annotations. But you might want to test the effects of your Annotations and (given an Annotation with parameters) this can get quite awkward if you try to write classes or methods for every variant to annotate and test.


Given an Annotation like this one:
{% highlight java linenos %}
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Lister {
    int position() default -1;
    String headerKey() default "";
    String displayKey() default "";
    boolean editInPlace() default false;
    boolean escapeModelString() default true;
    @SuppressWarnings("rawtypes")
    Class<? extends ILabelProvider> customLabelProvider() 
            default ILabelProvider.class;
}
{% endhighlight %}
There are countless combinations to test. It would be easy if new Lister() would work, but it doesn't (otherwise this article wouldn't make any sense at all). There are several solutions for this... What I'd call a plain core Java solution, an easy workaround, a little hack and my favourite. I'll describe them all so you can take your pick.

# The plain core Java solution: # 
You can create a class implementing java.lang.Annotation and your Annotation-interface. Using eclipse, you'll have to provide the fully qualified classname of your Annotation in the implements-clause. This will reduce the compile error to a warning stating *The annotation type Lister should not be used as a superinterface for [yourclass]* but that shouldn't bother you since you know, what you're doing or at least that's what you tell your code reviewing peer or boss.

You'll have to implement all the methods defined by your Annotation and the Annotation interface, so that can be a little bit of work but eclipse will do most of the job.

{% highlight java linenos %}
public class TestLister implements net.unbewaff.wicketcrudr.annotations.Lister, Annotation {
    private int position = -1;
    private String headerKey = "";
    private String displayKey = "";
    private boolean editInPlace = false;
    private boolean escapeModelString = false;
    @SuppressWarnings("rawtypes")
    private Class&lt;? extends ILabelProvider&gt; customLabelProvider = ILabelProvider.class;

    /**
        * @param position
        * @param headerKey
        * @param displayKey
        * @param editInPlace
        * @param escapeModelString
        * @param customLabelProvider
        */
    public TestLister(Integer position, String headerKey, String displayKey, 
            Boolean editInPlace, Boolean escapeModelString, 
            @SuppressWarnings("rawtypes") Class<? extends ILabelProvider> customLabelProvider) {

        if (position != null) {
            this.position = position;
        }
        if (headerKey != null) {
            this.headerKey = headerKey;
        }
        if (displayKey != null) {
            this.displayKey = displayKey;
        }
        if (editInPlace != null) {
            this.editInPlace = editInPlace;
        }
        if (escapeModelString != null) {
            this.escapeModelString = escapeModelString;
        }
        if (customLabelProvider != null) {
            this.customLabelProvider = customLabelProvider;
        }
    }


    @Override
    public int position() {
        return position;
    }
{% endhighlight %} 

I'll leave most of the methods to your imagination since they're just getters with a wrong name.

{% highlight java linenos startingline=51 %}
    @Override
    public int hashCode() {
        final int prime = 127;
        int result = 0;
        result += prime * customLabelProvider.hashCode() ^ ((customLabelProvider == null) ? 0 : customLabelProvider.hashCode());
        result += prime * displayKey.hashCode() ^ ((displayKey == null) ? 0 : displayKey.hashCode());
        result += prime * editInPlace.hashCode() ^ (Boolean.valueOf(editInPlace).hashCode());
        result += prime * escapeModelString.hashCode() ^ (Boolean.valueOf(escapeModelString).hashCode());
        result += prime * headerKey.hashCode() ^ ((headerKey == null) ? 0 : headerKey.hashCode());
        result += prime * position.hashCode() ^ (Integer.valueOf(position).hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) 
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        TestLister other = (TestLister) obj;
        if (customLabelProvider == null) {
            if (other.customLabelProvider != null)
                return false;
        } else if (!customLabelProvider.equals(other.customLabelProvider))
            return false;
        if (displayKey == null) {
            if (other.displayKey != null)
                return false;
        } else if (!displayKey.equals(other.displayKey))
            return false;
        if (editInPlace != other.editInPlace)
            return false;
        if (escapeModelString != other.escapeModelString)
            return false;
        if (headerKey == null) {
            if (other.headerKey != null)
                return false;
        } else if (!headerKey.equals(other.headerKey))
            return false;
        if (!Integer.valueOf(position).equals(Integer.valueOf(other.position)))
            return false;
        return true;
    }
}
{% endhighlight %}
<p>You'll need to pay attention to the implementation of equals and hashCode since the implementation differs from what eclipse generates by default. The <a title="Annotation Interface JavaDoc" href="http://download.oracle.com/javase/1,5.0/docs/api/java/lang/annotation/Annotation.html">Javadoc</a> for this explains the procedure.</p> 
<p>&quot;The hash code of an annotation member is (127 times the hash code
 of the member-name as computed by <a href="http://docs.oracle.com/javase/1.5.0/docs/api/java/lang/String.html#hashCode%28%29"><code>String.hashCode()</code></a>) XOR
 the hash code of the member-value, as defined below:&quot; </p><br /> 
<p><u style="color: #02ff00;">Pro</u>: Plain Old Java, easy to write and easy to understand </p> 
<p><u style="color: #ff0000;">Con</u>: Much code to write, needs to be updated whenever your Annotation changes, need to follow unusual implementations of equals and hashCode, warnings<br /></p><hr width="100%" size="2" /> 
<p><u>The easy workaround</u></p> 
<p>Just wrap it up. Create a class, add a member of your Annotation-Type, (in eclipse) right-click-&gt;Source-&gt;Generate Delegate methods... and implement them. Then continue to extract an Interface. That will look pretty similar to the definition of your Annotation but that's the point. Now you can change your consumers to accept the new interface instead of your Annotation and run your tests with mock implementations.<br /></p> 

{% highlight java linenos  %}
public class ListerWrapper implements IListerWrapper {

    private Lister internal;

    /**
     * @param internal
     */
    public ListerWrapper(Lister internal) {
        this.internal = internal;
    }

    /* (non-Javadoc)
     * @see net.unbewaff.wicketcrudr.annotations.IListerWrapper#position()
     */
    @Override
    public int position() {
        return internal.position();
    }
{% endhighlight %}

<p>Again, most of the implementation is left to your imagination. For testing you can use use any other implementation of your interface.</p> 
<p> </p> 
<p><u style="color: #02ff00;">Pro</u>: Plain Old Java, easy to write and easy to understand </p> 
<p><u style="color: #ff0000;">Con</u>: Much code to write, many quite useless classes and interfaces, needs to reflect changes to your Annotation<br /></p><hr width="100%" size="2" /> 
<p><u>The little hack</u><br />
<br />
An Annotation is in fact (as can be seen in the first solution) an Interface that can be implemented. But it can be proxied as well...</p> 

{% highlight java linenos  %}
{Lister.class, Annotation.class}, new InvocationHandler() {

        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // <TODO do your stuff here
            return null;
        }
    });
{% endhighlight %}
<p>This Proxy can be used just like the Annotation. All the magic (like your mock-code) goes into the invoke method. Just make sure, your proxy implements the Annotation-interface as well as your custom Annotation.<br /></p> 
<p> </p> 
<p><u style="color: #02ff00;">Pro</u>: Flexible, short, no additional classes, just has to reflect changes it it matters to the consumer in test.<br /></p> 
<p><u style="color: #ff0000;">Con</u>: Reflection<br /></p><hr width="100%" size="2" /> 
<p><u>My favourite </u></p> 
<p>The description of my favourite solution is quite short and in reality it's just a variant of the solution above. If it's an Interface, it can be proxied. It it can be proxied, it can be mocked.</p> 
{% highlight java linenos  %}
Lister l1 = mockery.mock(Lister.class);
{% endhighlight %}
<p>Creates a perfectly usable Mockobject to your Annotation, just waiting for the Expectations to be added</p> 
<p><u style="color: #02ff00;">Pro</u>: Flexible, short, no additional classes, additional testing possibilities with Expectations<br /></p> <u style="color: #ff0000;">Con</u>: needs jMock<br /> 