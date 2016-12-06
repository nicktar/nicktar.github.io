---
layout: post
title: Don't you hate it when your UnitTests break?
categories:
- best practice
- dependency injection
- integration test
- integrationtest
- j2ee
- java
- java enterprise
- jmock
- mocking
- software development
- unit test
- unittest
date: 2012-06-14 19:25:00.000000000 +02:00
---
UnitTests are great. Period. This fact has been established among developers. It helps to make sure your new code doesn't break anything else. It gives you regression testing "for free" and it can even be used as a design method (Test Driven Development). But tests break and they don't only break when code changes and new bugs are introduced to the system. They might break more or less on their own, when they aren't properly written. This causes work since you'll have to find out why this test is broken. Did you just break the feature under test or was the test just to fragile? was it you or was it the developer of the test?

Writing UnitTests isn't hard. It's just different from writing other code. While developing software is about making all the code interact, writing UnitTests is about taking things apart, identifying units as the-parts-to-test and encapsulating them from everything outside. 

Good tests are robust to any change happening to the environment or any changes to all the code outside their specific unit. There are some principles that help to make tests clean, easy and most of all robust.

Most of the following stuff uses Java terminology but it applies and can be applied to any other language.


# Focus! Focus! Focus! #
Identify your unit under test and make sure, this is indeed a unit and not some bigger part. Units under test should be close to the smallest part of your code that can stand on it's own. When you found your unit, separate it from everything else. You want to test this specific part of your code and nothing else. The philosophy behind UnitTests is to test some small part of code assuming that everything else works fine (or just doesn't work if you want to test this case). Whenever you test code that relies on external libraries or some framework or other code, it's not your job to make sure that these dependencies work as designed. You just have to make sure, that your code does. Testing the dependencies is part of their developers job not yours. 

Everything outside your code is out of your scope and should be mocked. Mocking frameworks like jMock or jMockit make this easier but you can work without them too. Likewise, Dependency Injection can make your job easier by offering ways to inject mocked dependencies but likewise, that's optional. Just mock everything outside of your unit under test. By separating your test from the world outside, you can make sure it wouldn't break if the world changes as long as it's little island stays the same. Using data from databases, static resources, environment variables (the registry if you're on windows) makes the outcome of your test dependent on these and attaching to many strings to pull on makes your test easy to topple over. It can even make your test dependent on the test execution order. If you need external data and can't just mock it, test it. Make sure it's like you expect it to be so you've got a marker that your test failed because the prerequisites changed (the data test failed).

# Bore it! #
Make sure your test always does the very same with the very same result. It is tempting to use random data for your test and it even seems to make sense as it tests different cases with every test run. But this is not what UnitTests are about. They are about getting reproducible results from defined data. If your random driven test fails once in a while, you'll have a really hard time finding out what made it fail since the random data is lost as soon as the test is over. If you don't want to come up with meaningless test data you can go ahead and create random data while writing the test and using this for your mocks but use the same data for each test run. This can even be reasoned using the first point. You don't want to test random data generation, so Math.random() is out of your scope and should be mocked.

A good tests runs thousands of times and (as long as there is nothing wrong) creates the same results every time.

Having tests wait while something other happens and requiring the results is a bad idea. Timing might be difficult. The "something else" might break or go away. You're most definitely testing outside of your scope. Just to name a few.

Just with every other test, you should have one test for the border of each equivalence class of valid and invalid data. You can't have that using random stuff. Even data that's somehow needed but not relevant to the test should be deterministic (as in hard coded). That's one of the biggest differences between writing tests and developing "real code". In tests, hard coding data is good. Another big difference is that within tests, there is no DRY (Don't repeat yourself). If you don't want to rely on anything outside of your scope, you need to mock it and most likely need to mock it again and again and again. Sure, you can use methods to create your mocks but these should be completely under your control as the developer of the test. As a result of this, they should be private and reside within your class (otherwise you wouldn't be able to use these private methods). Code reuse in tests makes them more fragile so the copy and paste development anti-pattern can find it's niche in test development.


# KISS! KISS! KISS! #
Keep It Simple, Stupid! If you've got to test several things, write several tests. There are those who say that there should only be one assert per test but I disagree. There are perfectly valid and common situations where multiple asserts make perfectly sense. What they actually want to say (at least I hope so) is that you should separate your test cases. It isn't sufficient to have one test per unit under test as you've got to make sure that it works for several different (mocked) inputs. These should be separated into tests of their own.

Just to be clear: A test, as I use the word is a single test method. Something that gets annotated with ```@Test``` in jUnit.

As a rule of thumb, you shouldn't call your unit under test more than once per test. This way your tests will be smaller, easier to read and a lot more meaningful as you can see want went wrong by checking which test failed without having to look what failed inside the test.

An exception to this is testing with (unit test specific) data providers that call the test method over and over with predefined input scenarios to keep the redundance down.

# Don't dabble in the black arts #
There are white-box tests and black-box tests. UnitTests are of the former, integration tests of the later kind. So the two thing you need to know when writing a test is the requirements and the implementation. You've got to make sure, the implementation meets the requirements by writing tests that call the implementation with the required input and assert it generates the required output. As the requirements trend to be more on the broad side there will be additional requirements based on your implementation as you had to split the requirements into smaller units that need to be tested. When developing test driven, your first tests will be more like integration tests than like UnitTests. That's ok as long as they don't involve testing external dependencies. UnitTests and integration tests are different in a way that they require different tools to be done easily.

When defining the input for your tests you have to keep in mind both, what input is defined as valid (and what is happening to invalid input by definition) and which additional requirements (or lack thereof) was introduced while implementing the code.


# Don't care how you got there #
It might sound contradictory to the last point but it isn't. While you have to test that the code is working within the limits defined by the requirements and the implementation you shouldn't be testing how the requirements were met. All that counts (for the test) is that they're met. As far as a test is concerned, the end justifies the means. So when writing the test to make sure, the requirements are met, make sure to test exactly for that. Don't care which methods are called, mock them so they can be replaced later. Every method your code uses should have at least one test of it's own so you don't have to test it again. A high code coverage is great but you've got to make sure it's coverage by test and not collateral coverage by failing to mock. So methods clocking up a real high execution count should be looked into, if they're actually tested on their own or just used in other tests.

# Don't overdo it #
Having a full test coverage with meaningful tests that make sure every aspect of your code is working as designed feels good, is rewarding and a waste of time. I know I seem contradictory again but as far as reality is concerned, there are no easy truths. Testing trivial code is boring and completely useless. If you didn't need your brain to write it, you probably shouldn't bother it by testing it either. What's the gain in testing a simple getter or setter or testing a method that spends it time adding 2 integers? These are proven and working parts of your programming language. They are tested countless times by life applications and you shouldn't worry about them stopping to work more than worrying about the sun not raising. Likewise testing every step along the way of your code isn't only a waste of time on it's own but it hinders innovation and further development as well. As long as you don't mock a really expensive operation, what's the gain in making sure that a given method is called exactly 3 times in a specific sequence? When you at some point decide to switch two invocations to ad a third one in between for some added functionality, should your test break if it still produces the desired output given the specified input?

# tl;rd #
So... writing robust tests isn't hard as long as you keep yourself focused, the tests simple, well isolated, repeatable and at the needed minimum. It just takes some practice and some thinking ahead when writing code. A good tests is one that doesn't fail unless the unit under test is really broken. If a test fails every now and then, you'll be most likely able to come up with a better way to test it or find out, what's causing the failures and test that.
         