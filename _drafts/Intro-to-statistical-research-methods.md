---
layout: post
tags:
- unit test
- software development
categories:
- software development
- java
- testing
title: 10 Ways to make your tests great (again)
date: 2016-12-29 22:17:17.000000000 +02:00
logo: assets/mojito.jpg


TOC 

    - What are you testing and why? Think ahead, plan your test
    - Make your tests readable, add comments, explain the expected behaviour, make tem easy to debug
    - KISS your tests... Tests should be small and simple, use setup and teardown for preparadion and cleanup
    - Test one thing only, one scenario per testcase (or per set of parameters). This makes it obvious why a test failed and helps debuggung
    - Make your tests fast so they can run more often and provide more feedback
    - Tests must be deterministic. Non-Deterministic tests reduce trust in your tests and make them worthless. Fix failing tests immediately
    - Make tests independent. Tests must be able to be run in any order with any subset. No dependencies
    - Provide diagnostic data on failure. Use messages in your asserts or use asserts that provide messages. 
    - No hard coding your environment, or better yet no real environment. Use mocks, in memory databases or config files
    - Tests should run silently. A passing test should 
