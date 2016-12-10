---
layout: post
comments: true
title: Profiling a UnitTest using DevPartner Java Edition
tags:
- dependency injection
- devpartner
- documentation
- java
- profiling
- rant
- software development
date: 2011-03-31 13:47:50.000000000 +02:00
---
I'm stuck with an ancient version of DevPartner at work. For those of you luckily not knowing, what DevPartner is - It's a Profiler and it's the single worst documented software I was ever forced to use.


When profiling a specific functionality to find out why it takes as long as it does, it's much more useful to write a UnitTest to profile said functionality than to invoke the whole stack from browser/application server to database and below, which don't do much except from polluting your results. But since the latest Eclipse-Plugin for DevProfiler is aimed at Eclipse 3.0 (remember, that was released back in June 2004) there is no easy or even documented way to do so.

Googling isn't really useful until you remember that some parameter like -Xrun did the trick a couple of months back when you were trying to get this to work for the last time (wasting about a days worth of time trying to figure out, how). Provided with this parameter, Google points you to [the installation guide] [1] (along with a couple of knowledge-base entries on how to manually integrate DevPartner into IntelliJ and NetBeans) where you can find a chapter filed under "Configuring Application Servers" named "Manually invoking the Profiler" and "Using -Xrun to Invoke the Profiler". I don't know if it's just me or if an installation guide's chapter about integration into application servers is a slightly weird place to hide that gem.

Bad story short:  

- when using JVMPI (jdk 5.0 and below) you need to use this command line parameter and switch your jvm to the DevPartner-one -Xrun dpjCore:NM_ANALYSIS_TYPE={coverage,performance,memory}:NM_CONFIG_NAME={test-name} with performance being the default analysis type and the classname being the default config name. 
- when using JVMTI (jdk 6.0 and above) you need to use this command line parameter and switch your jvm to the DevPartner-one -agentlib:dpjJvmtiCore=NM_ANALYSIS_TYPE={coverage,performance,memory},NM_CONFIG_NAME={test-name} with performance being the default analysis type and the classname being the default config name.

Don't we all love self explaining function and parameter names?

[1]: "http://supportline.microfocus.com/Documentation/books/DevPartner/doc/DPJ/DPJ44/PDF/Installing_DevPartner_Java.pdf"
