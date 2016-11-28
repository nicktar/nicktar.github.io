---
layout: post
title: Realising complex cross-component ajax actions in wicket - The observer way
categories:
- Apache Wicket
- ajax
- apache
- apache wicket
- complex ajax
- guildwars assistant
- gwassist.de
- observer
- observer pattern
- software development
- wicket 1.4
permalink: "/archives/8-Realising-complex-cross-component-ajax-actions-in-wicket-The-observer-way.html"
s9y_link: http://wicket-game.gwassist.de/archives/8-Realising-complex-cross-component-ajax-actions-in-wicket-The-observer-way.html
date: 2011-06-15 11:26:40.000000000 +02:00
---
<p><strong><u>Please note</u></strong>: This article applies to wicket versions prior to 1.5 only. Wicket 1.5 introduces an event bus to handle these types of requirements. The solution described here works but it has some issues that weren't completely resolved when I switched to Wicket 1.5. Most annoying among these is the rather tight coupling from the components to their page, which could be removed by extracting the IReflector-related code from the page and creating an own class for it.</p><hr width="100%" size="2" />More likely earlier than later while working with wicket one comes to the point, where there is the need to have one component to change based on an Ajax-event triggered inside another component. May this be a Logout Button that needs to be displayed after a successful login or a panel displaying shipping costs and updating these, whenever items are added to the cart or an address-panel to change it's contents based on a contact selected. 





<p>Having one component update another introduces tight coupling, reduces the re usability of the components involved, gets increasingly hard to maintain and just smells really bad.</p> 
<p>To fix this, one could wait for the event-bus of wicket 1.5 or work around it by simulating something resembling said event-bus. As usual with software development there are several ways to archive this (The good, the other good one and the ugly as seen above). Like many other coupling problems the main solution to this is some idea known as Inversion of Control, which can be freely translated to the words of JFK - &quot;Don't ask what your component can do for you. Ask, what you can do for your component.&quot;</p> <br /><a href="http://wicket-game.gwassist.de/archives/8-Realising-complex-cross-component-ajax-actions-in-wicket-The-observer-way.html#extended">Continue reading "Realising complex cross-component ajax actions in wicket - The observer way"</a>
