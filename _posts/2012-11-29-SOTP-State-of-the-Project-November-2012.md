---
layout: post
comments: true
title: SOTP (State of the Project) - November 2012
tags:
- software development
- sotp
- wicket
- wicket-crudr
date: 2012-11-29 09:04:11.000000000 +01:00
comments: true
---
Now, that the project is a little more than 7 months old and taking it slow due to other obligations, I'd like to offer a little summary on the current state of the project.

I've spent a couple of hours starting a demo application using Wicket-CRUDr to show and keep track of what the framework can do right now. This application is the current Proof of Concept for the project, so whenever I run into an issue, I stop working on the application and fix the framework instead. This is necessary since there is no such thing as a project plan or even QA beyond Unittests. Main issue right now is a bug where somewhere between a displayed object and the list it contains, the model-chain is broken so that the model of the list isn't updated. Since the framework relies heavily on builders and factories this is quite hard to track (as usual when there are factories involved). 