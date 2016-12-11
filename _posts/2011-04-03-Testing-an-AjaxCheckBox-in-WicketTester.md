---
layout: post
comments: true
title: Testing an AjaxCheckBox in WicketTester
tags:
- apache wicket
- formtester
- unit test
- wickettester
categories:
- software development
- java
- wicket
date: 2011-04-03 15:49:10.000000000 +02:00
---
Setting up a unit test for a form containing an AjaxCheckBox seems pretty straightforward and simple. So simple that it's easy to forget two essential steps... 


{% highlight java linenos %} 
@Test
public void testDeSelectingCheckbox() {
    WicketTester tester = new WicketTester ( new WicketApplication());
    final HomePage homePage = new HomePage(true);
    tester.startPage(new ITestPageSource() {

        public Page getTestPage() {
            return homePage;
        }
    });
    org.junit.Assert.assertTrue("Initial value should be true.", homePage.getValue());
    tester.executeAjaxEvent("form:box","onclick");
    org.junit.Assert.assertTrue("onUpdate wasn't called.", homePage.getOnUpdateExecuted());
    tester.assertLabel("text","false");
    org.junit.Assert.assertFalse("Final value should be false.", homePage.getValue());
}
{% endhighlight %}
At a first glance this test looks ok, and it even runs perfectly. While this one, looking very similar, fails miserably

{% highlight java linenos %} 
@Test
public void testSelectingCheckbox() {
    WicketTester tester = new WicketTester(new WicketApplication());
    final HomePage homePage = new HomePage(false);
    tester.startPage(new ITestPageSource() {

        public Page getTestPage() {
            return homePage;
        }
    });
    org.junit.Assert.assertFalse("Initial value should be false.", homePage.getValue());
    tester.executeAjaxEvent("form:box","onclick");
    org.junit.Assert.assertFalse("onUpdate wasn't called.", homePage.getOnUpdateExecuted());
    tester.assertLabel("text","true");
    org.junit.Assert.assertTrue("Final value should be true.", homePage.getValue());
}
{% endhighlight %}
After some head-scratching and even considering a bug in WicketTester one could spot 2 little lines missing from both test cases rendering them both useless since the value of the checkbox' model will always be false after the test is run.

{% highlight java linenos %} 
@Test
public void testSelectingCheckbox() {
    WicketTester tester = new WicketTester(new WicketApplication());
    final HomePage homePage = new HomePage(false);
    tester.startPage(newITestPageSource() {

        public Page getTestPage() {
            return homePage;
        }
    });
    FormTester formTester = tester.newFormTester("form");
    formTester.setValue("box", true);
    org.junit.Assert.assertFalse("Initial value should be false.", homePage.getValue());
    tester.executeAjaxEvent("form:box","onclick");
    org.junit.Assert.assertTrue("onUpdate wasn't called.", homePage.getOnUpdateExecuted());
    tester.assertLabel("text","true");
    org.junit.Assert.assertTrue("Final value should be true.", homePage.getValue());
}
{% endhighlight %} 
The magic lies within the lines 12 and 13. Even if you've got no obvious value to set, when testing forms and formcomponents, you need to use FormTester no matter what.

<p>Simple, easy and true but equaly easy to forget and thus wasting a couple of hours, trying to figure out what's wrong.</p>
