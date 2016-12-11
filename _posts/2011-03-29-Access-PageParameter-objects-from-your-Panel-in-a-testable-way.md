---
layout: post
comments: true
title: Access PageParameter objects from your Panel in a testable way
tags:
- apache wicket
- dependency injection
- software development
- wickettester
categories:
- software development
- java
- wicket
date: 2011-03-29 14:32:31.000000000 +02:00
comments: true
---
When trying to build stateless pages without the user noticing, like building an application using AjaxFallBackLinks and reusing the fall-back to provide a search-engine-friendly version of your application, you've got to put the state into PageParameters, which can be transported via bookmarkable links.


The most obvious way to access these Parameters from your Panel is a simple getPage().getPageParameters(). But as simple as it looks this is bad in a couple of ways. First it introduces tight coupling between your Panel and Page, which makes it hard to test (as in: you need to provide a page to test the Panel.). Second getPage() isn't available on construction-time. So calling getPage().getPageParameters() in the panel's constructor throws a NullPointerException.

If it's hard to test you're probably doing it wrong.

The primary solution to coupling is decoupling (yeah, very funny, I know). In most cases it's decoupling by Inversion of Control or Dependency Injection. I'm not talking about DI-Frameworks here but about simple constructor injection to provide the Panel with the Parameter-Object instead of telling it where to look. This can be archived by a simple constructor like this one<

{% highlight java linenos %} 
package de.gwassist.page.panels

public class MyPanel extends Panel {    

    private PageParameters params;

    public MyPanel(String id, Model<T> model, PageParameters param) {
        super(id, model);
        this.params = params;
        //...
    }
}
{% endhighlight %} 

or even better by including the needed parameters or the whole PageParameter object into your Panel's model. This has the added bonus that new PageParameter objects can be injected by setting the model object of the panel. Any actions based on the new PageParameters can be performed either in onBeforeRender() or onModelChanged().

For now I'll stick to the inferior way because it introduces less sample code to show but the other way should be easy to figure out.

So, when testing one can simply use

{% highlight java linenos %} 
package de.gwassist.de.page.panels
 
public class MyPanelTest {

    private WicketTester tester = new WicketTester();

    @Test
    public void someTestCase() {
        tester.startPanel(new TestPanelSource() {

            @Override
            public Panel getTestPanel(String id) {
                PageParameters params = new PageParameters();
                params.add("somekey", "somevalue");
                return new MyPanel(id, null, params);
            }
        }
        tester.assertComponent("panel", MyPanel.class);
    }
}
{% endhighlight %} 

Please note, that even if TestPanelSource is an Interface it's missing the starting I from its name. This has been adressed in [Issue 3479] [1] and is corrected as of Wicket 1.4.17 with deprecating TestPanelSource and adding ITestPanelSource.

Please note also, that it's kind of a bad idea to hard-code the id of your Panel when doing the asserts. It's better to use the id given from getTestPanel but that's an exercise left to do.

[1]. "https://issues.apache.org/jira/browse/WICKET-3479"