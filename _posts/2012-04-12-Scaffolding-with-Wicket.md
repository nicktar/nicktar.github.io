---
layout: post
title: Scaffolding with Wicket
tags:
- apache
- apache wicket
- crud
- java
- scaffolding
- wicket-crudr
date: 2012-04-12 09:22:52.000000000 +02:00
---
What I like least in web development is to write simple CRUD editors. These no-brainer lists and forms without any logic or other fun stuff, that are needed just for data entry or administration of a web application. I don't talk about any of these fancy client-facing editors that contain the juice of the application but the simple database-to-model-to-browser-to-model-to-database-workhorses that do the heavy lifting in the background. Other frameworks or programming languages try to help you writing these by providing scaffolding methods that either create those forms on the fly at runtime or by using code generators. There are a couple or attempts to do this with Wicket but none that suited my needs.      

Searching for solutions I found Wicketopia, Wicket RAD, Wicket CRUD and Databinder.net. All of them have issues that prevent me from using them. 

* Wicketopia looks like the most promising solution and I even used it for some time despite the fact that it initially includes its own copy of Wicket and Spring forcing you to fight your way through some rather nasty pom.xml-related magic. The solution is quite heavy-weighted, doing it's own JPA-persistence and Spring Security and works as a plugin to your Wicket application. Mails to the mailing list remain unanswered even after about 1 year (as of April 2012) and the latest version I could find was still based on Wicket 1.4.x and thus incompatible to any Wicket 1.5.x application. Furthermore the project is hosted at two different locations (<a href="http://wicketopia.sourceforge.net/" >sourceforge</a> and <a href="https://github.com/jwcarman/Wicketopia" >github</a> with github being the more recently updated one)
* [Wicket RAD](http://sites.google.com/site/wicketrad/) looks pretty dead to me. It was last updated 18 Month ago and is thus not supporting wicket 1.5 
* [Wicket CRUD](http://www.learntechnology.net/content/wicket/wicket_crud.jsp) is more a concept of proof than a production ready solution and dated back to Feb. 2006 targeting a snapshot of Wicket 1.2. So this seems more like a educational effort. 
* [Databinder.net](http://databinder.net) has been moved to github and hasn't been updated in two years. Instead it has been forked to death with [this fork](https://github.com/wicket-databinder/wicket-databinder) seeming to be the most active one. I didn't actually try to use databinder because it looks like a pretty disorganized single-person-driven approach. At my former employer we used databinder only to provide Hibernate Sessions, which doesn't feel right... 

Following the advice from Martijn Dashorst on [stackoverflow](http://stackoverflow.com/questions/9997688/scaffolding-in-wicket, I decided to add to the disorganized-singe-person-approaches and invent my own version of scaffolding for Wicket.
                 