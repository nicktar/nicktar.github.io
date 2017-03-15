---
layout: post
tags:
- unit test
- software development
- mockito
categories:
- software development
- java
- testing
title: Sipping a Mockito to the tune of Java 8 
date: 2017-03-15 22:16:58 +1:00
logo: assets/mojito.jpg
---
Testing applications that use Java 8 language features with a mocking framework that doesn't offer an adequate support can be quit cumbersome, tiring and error prone. Each and every of these properties is something that you don't want to list in relation to your tests. With Mockito embracing Java 8 in it's current 2.7 version (and every other 2.x version), help is near, so it's time to grab a (new version of) Mockito and relax to the tunes of Java 8.


## New default return values

<img src="{{ "assets/mojito.jpg" | absolute_url}}" align="left" width="320px" style="padding-right:5px" />
Mockito used to return null for every method call that wasn't configured to return something (or a zero value for every method returning a primitive). This has changed for methods returning Optionals and Streams. While I still have to see many stream returning methods in the wild, Optional is just made to be returned, so changing the default behavior of that might sound scary if you already have tests covering those type of methods, it's a great improvement. Especially since the original behavior was close to useless for Optionals and if you tested those, you didn't use the default behavior in close to any case. 

As of version 2, calls to method mocks with an Optional return value will result in an `Optional.empty()` and method calls returning a stream will yield an empty stream. If you for example consider this interface as the one you want to mock

{% highlight java linenos %}
public interface Fridge {
   /**
    * Gets the selected food item from the fridge
    *
    * @param id which food item to get
   **/
   Optional<Food> getFood(FoodIdentifier id);

   /**
    * Gets the whole contents of the fridge in a continuous stream of food. 
    * After calling this method, the fridge is empty. 
   **/
   Stream<Food> getAll();
} 
{% endhighlight %}

{% highlight java linenos %}
public class CookTest {
    @Mock
    private Fridge fridge;

    @Test
    public void testGatherIngredients() {
        Cook Cook = new Cook(fridge);
        Optional<Food> meat = fridge.getFood(FoodIdentifier.MEAT);
        assertFalse(meat.isPresent());
    } 
}
{% endhighlight %}

Prior to Version 2 this test would throw a NullPointerException at the assert since an undefined method invocation would have returned null. With version 2 this test would be green. The same is valid for the following test

{% highlight java linenos %}
public class BingeEaterTest {
    @Mock
    private Fridge fridge;

    @Test
    public void testBingeEatingEmptyFridge() {
        BingeEater eater = new BingeEater(fridge);
        eater.binge(fridge.getAll());
        assertTrue(eater.isHungry());        
    }
}
{% endhighlight %}
Here to a test run prior to version 2 would have failed with a `NullPointerException` while one run under Mockito 2 would be green.

## Mocking default implementations

With version 1 of Mockito you just couldn't mock a default implementation and have it call the actual default implementation but that's what you need if you want to test your default implementation that might call unimplemented methods of the interface that should be mocked as you want to test the method only and not its dependencies. 

Prior to Version 2 Mockito did a sanity check that prevented developers from doing a `.thenCallRealMethod` on Interfaces as it was a sure fail. With Java 8 the sanity check wasn't useful anymore and so it was dropped in Version 2.

## Embracing Lambda expressions for Matchers and Answers

This change helps developers to write cleaner, more readable test code as it takes away much of the boilerplate code that was needed to create Matchers and Answers in the old days. So basically ArgumentMatcher and Answer got their `@FunctionalInterface` annotation so we can drop straight to the meat of the Matcher or Answer in question like this `AdditionalAnswers.answer(arg -> arg > 0)`. 

As an additional gimmick, Mockito dropped the second argument of all those methods calls to get the invocation arguments defining the type of the argument. Instead Mockito infers the type of the argument from the context. 

## Getting all the verification failures at once

While plaing red-green-refactor on some brownfield code, the red phase can become quite tiring when there are multiple verifications of methods that were moved or no longer needed in a single test and the test isn't too fast. You have to run it again and again, every time just fixing the one failure you know about only to be told that the next one is just two lines below. 

Enter the Mockito ˋVerificationCollectorˋ, a byproduct of the effort to find unused stubs but a great addition. The collector collects all the test failures until the end of the test and only then fails the test and tells you everything that went wrong, not just the first thing it found. Just add the following Rule to your tests and get the complete lists. 
{% highlight java linenos %}
@Rule
public VerificationCollector collector = MockitoJUnit.collector();
{% endhighlight %}

## JUnit5 on the horizon

Not directly related to the current Mockito release but still noteworthy: The JUnit5 team created an extension to inject mocks into setup methods or tests. While the Mockito team intends to provide full integration with JUnit5 once it's released it's a nice preview. To tell the truth, I can't see the value of injecting mocks via the test method signature but this might or most likely will change once I had some time to play with this.

Because I don't see the merit yet I can't come up with a reasonable example to point out these, so I took the liberty of reusing their example. 
{% highlight java linenos %}
@ExtendWith(MockitoExtension.class)
class MockitoExtensionInBaseClassTest {

  @Mock private NumberGenerator numberGenerator;
  @BeforeEach void set_stubs(@Mock MyType myType, TestInfo testInfo) {
      // do some stubs
  }

  @Test
  void firstTestWithInjectedMock(@Mock MyType myType) {
      // play with mock
  }
}
{% endhighlight %}

## Doing the undoable

About developer I know has at least once cursed a final method or class while trying to mock it. Usually this resulted in a removed final keyword, untested code or some smelly constructs like visible final delegators calling packages private or protected delegates that can be mocked and tested, introducing in directions into production code that are only there for testing reasons. 

This to can be a thing of the past with version 2.1.0. Currently this is opt-in functionality that requires you to place a file called `src/test/resources/mockito-extensions/org.mockito.plugins.MockMaker` in your project containing a single line: `mock-maker-inline`

Since it uses some dark magic with Java Agent instrumentation and subclassing it's currently only available using this extension mechanism but the Mockito team plans on implementing a programmatically way to switch between the different mock makers. As the new arcane maker has some new limitations it might be necessary to switch to between those two for different scenarios. 

## Cleaning up some old code

As the code under test evolves, grows and gets refactored there might be Stubs in the tests that aren't used anymore but no one notices because a configured mock is a used value as far as your favorite IDE is concerned. The default `MockitoJUnitRunner` and `MockitoJUnit.rule()` now detect those unused stubs. If you've got to many of those to clean them up right now there are the silent versions `MockitoJUnitRunner.Silent` and `MockitoJUnit.rule().silent()` to suppress this detection. But your code still smells.

## Additional Changes

Most developer will not notice, but those who do will most likely be happy to see that Mockito dropped CGLIB for ByteBuddy as it's mock maker engine and was thus able to get rid of some long living bugs. Additionally Mockito doesn't depend on Hamcrest anymore to avoid version conflicts. For those that need to integrate with Hamcrest, Mockito offers `org.mockito.hamcrest.MockitoHamcrest`

Mockito can now spy on abstract classes, provided they come with a no argument constructor. 

## The downside (there has to be one)

Some of these improvements are breaking changes so there is broken stuff, stuff that needs to be changed and stuff that needs to be cleaned up.

* You need to clean up your unused stubs. You had to do so even before Mockito 2 but you didn't know...
* You need to evaluate where to change your matchers, as `<T> T any()` will now do null checks and no longer matches null values. Additionally `<T> List<T> anyListOf(Class<T>)` will now perform a check it the argument is indeed a list. 
* `Mockito` doesn't inherit from `Matchers` anymore. Instead they share a common ancestor in `ArgumentMatchers`. Additionally `Matchers` was marked as deprecated.
* With the move away from Hamcrest, Matchers like `Matchers.argThat()` is now `MockitoHamcrest.argThat()`. If you added the correct dependencies and worked with static imports in first place, this change should be mainly a job of triggering new imports in your IDE.
* Despite adding the ability to mock Java 8 features, the required Java version of Mockito only increased to 6.

## Get the current version (at time of writing)

```
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>2.7.17</version>
</dependency>
```

## And remember

* Do not mock types you don't own
* Don't mock value objects
* Don't mock everything
* Show some love with your tests