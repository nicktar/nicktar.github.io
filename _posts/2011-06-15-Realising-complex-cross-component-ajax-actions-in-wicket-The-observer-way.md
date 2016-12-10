---
layout: post
comments: true
title: Realising complex cross-component ajax actions in wicket - The observer way
tags:
- ajax
- apache wicket
- observer pattern
- software development
- wicket 1.4
date: 2011-06-15 11:26:40.000000000 +02:00
---
**Please note**: This article applies to wicket versions prior to 1.5 only. Wicket 1.5 introduces an event bus to handle these types of requirements. The solution described here works but it has some issues that weren't completely resolved when I switched to Wicket 1.5. Most annoying among these is the rather tight coupling from the components to their page, which could be removed by extracting the IReflector-related code from the page and creating an own class for it.


More likely earlier than later while working with wicket one comes to the point, where there is the need to have one component to change based on an Ajax-event triggered inside another component. May this be a Logout Button that needs to be displayed after a successful login or a panel displaying shipping costs and updating these, whenever items are added to the cart or an address-panel to change it's contents based on a contact selected. 

Having one component update another introduces tight coupling, reduces the re usability of the components involved, gets increasingly hard to maintain and just smells really bad.

To fix this, one could wait for the event-bus of wicket 1.5 or work around it by simulating something resembling said event-bus. As usual with software development there are several ways to archive this (The good, the other good one and the ugly as seen above). Like many other coupling problems the main solution to this is some idea known as Inversion of Control, which can be freely translated to the words of JFK - "Don't ask what your component can do for you. Ask, what you can do for your component."

The generic run-of-the-mill observer-pattern is a good starting point if you've got to trigger reaction across class-borders but it doesn't go far enough since a component would have to register with every component it needs to react to without knowing if this component is even part of the page. The address panel from the above example would have to register with the address-list, which might not be present if you've got a page showing only to currently logged in users details. So you've got to fall-back to something that's always there like the application or page. The application might seem like a good point to handle this but isn't. Partly due to a violation of the Segregation of Concerns but mainly due to the fact that the application isn't tied to any user action, the page is the place to go. So the page gets to decide, which component to modify and re-render? No. The page gets to know which component might need to be re-rendered and give them the opportunity to do so.

So this is the base page to this approach:

{% highlight java linenos %} 
public abstract class APage extends WebPage implements IReflector {
 
    private Set<IObserver> observers = new HashSet<IObserver>;();

    @Override
    public void addObserver(IObserver observer) {
        observers.add(observer);
    }
 
    @Override
    public void removeObserver(IObserver observer) {
        observers.remove(observer);
    }
 
    @Override
    public void observe(IObservable observable, ObserveEvent event, IModel<?> model, 
                        AjaxRequestTarget target) {
        for (IObserver observer: observers) {
            if (!observer.equals(this)) {
               observer.observe(observable, event, model, target);
           }
        }
    }
  
}
{% endhighlight %} 

As usual, irrelevant parts are skipped...

Followed by the used interfaces:

{% highlight java linenos %} 
public interface IReflector extends IObservable, IObserver {
     
    public abstract void observeMe(IObservable observerable); 
 
}
{% endhighlight %} 

{% highlight java linenos %} 
public interface IObservable {
  
    public abstract void addObserver(IObserver observer);
      
    public abstract void removeObserver(IObserver observer);
}
{% endhighlight %} 

{% highlight java linenos %} 
public interface IObserver {
      
    public void observe (IObservable observable, ObserveEvent event, IModel&amp;lt;?&amp;gt; model, 
                         AjaxRequestTarget target);
 
}
{% endhighlight %} 

The ObserveEvent is an enum but could be changed to a class if you want to include the payload (here the observable and the model) into the event.

Any Component that might receive Ajax-events relevant to others implements IObservable (I intentionally don't use java.util.Observable here since it's a class and not an Interface, which I think is wrong) and adds the page to it's list of observers. A list because at some point I might want to add more, non-wicket observers which wouldn't know anything about pages (like caching-providers and the like). Note that this can't be done in the component's constructor since the page isn't defined there. This has to happen after the component was added to the page.

>Whenever an Ajax-even occurs that might be of interest to other components, the appropriate method (onClick, onUpdate, onToSomething) contains a call to

{% highlight java linenos %} 
private void notifyObservers(IObservable observable, ObserveEvent event, IModel<?> model, 
                             AjaxRequestTarget target) {
 
    for (IObserver observer : observers) {
        if (!observer.equals(this)) {
            observer.observe(observable, event, model, target);
        }
    }
}
{% endhighlight %} 

using itself, the matching event, it's model and target as parameters. The page as (currently only) item of the list reflects the call to it's observe-method (thus the IReflector interface name) to every item on it's list, passing all the parameters so every registered component can check if and what action is needed and if it has to attach itself to the target.

The downside of this is the non-existing protection against infinite loops or recursions as theoretically every component receiving such a notification could raise an event of it's own. It's up to the developer to check if there might be loops. 

A similar result can be archived by using the wicket visitor mechanism instead of the reflective observers described here. This would reduce the coupling of the components and their page but with the switch to wicket 1.5 I never tried this one.                