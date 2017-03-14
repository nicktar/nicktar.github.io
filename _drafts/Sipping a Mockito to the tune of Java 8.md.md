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
date: 2016-12-29 22:17:17.000000000 +02:00
logo: assets/mojito.jpg
---
Testing applications that use Java 8 language features with a mocking framework that doesn't offer an adequate support can be quit cumbersome, tiring and error prone. Each and every of these properties is something that you don't want to list in relation to your tests. With Mockito embracing Java 8 in it's current 2.0 version, help is near, so it's time to grab a (new version of) Mockito and relax to the tunes of Java 8.


## New default return values
Mockito used to return null for every method call that wasn't configured to return something (or a zero value for every method returning a primitive). This has changed for methods returning Optionals and Streams. While I still have to see many stream returning methods in the wild, Optional is just made to be returned, so changing the default behavior of that might sound scary if you already have tests covering those type of methods, it's a great improvement. Especially since the original behavior was close to useless for Optionals and if you tested those, you didn't use the default behavior in close to any case. 

As of version 2, calls to method mocks with an Optional return value will result in an Optional.empty() and method calls returning a stream will yield an empty stream. %example here

## Mocking default implementations
With version 1 of Mockito you just couldn't mock a default implementation and have it call the actual default implementation but that's what you need if you want to test your default implementation that might call unimplemented methods of the interface that should be mocked as you want to test the method only and not its dependencies. 

Prior to Version 2 Mockito did a sanity check that prevented developers from doing a thenCallRealMethod on Interfaces as it was a sure fail. With Java 8 the sanity check wasn't useful anymore and so it was dropped in Version 2.

## Embracing Lambda expressions for Matchers and Answers

This change helps developers to write cleaner, more readable test code as it takes away much of the boilerplate code that was needed to create Matchers and Answers in the old days. So basically ArgumentMatcher and Answer got their @FunctionalInterface annotation so we can drop straight to the meat of the Matcher or Answer in question. %example here

As an additional gimmick, Mockito dropped the second argument of all those methods calls to get the invocation arguments defining the type of the argument. Instead Mockito infers the type of the argument from the context. 

## Getting all the failures at once

```
@Rule
public VerificationCollector collector = MockitoJUnit.collector();
```
## JUnit5 on the horizon

A bit more friendliness with JUnit 5 via 3rd party extension. The JUnit team developed a JUnit 5 extension, that allows to inject mocks in the test via method parameters :

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
The extension repository is here and is not managed by the mockito team. Once JUnit 5 goes live we will look into providing built-in integration (in Mockito).

## Doing the undoable

Mock the unmockable: opt-in mocking of final classes/methods

For a long time our users suffered a disbelief when Mockito refused to mock a final class. Mocking of final methods was even more problematic, causing surprising behavior of the framework and generating angry troubleshooting. The lack of mocking finals was a chief limitation of Mockito since its inception in 2007. The root cause was the lack of sufficient support in mock creation / bytecode generation. Until Rafael Winterhalter decided to fix the problem and provide opt-in implementation in Mockito 2.1.0. In the releases, Mockito team will make mocking the unmockable completely seamless, greatly improving developer experience.

Mocking of final classes and methods is an incubating, opt-in feature. It uses a combination of Java agent instrumentation and subclassing in order to enable mockability of these types. As this works differently to our current mechanism and this one has different limitations and as we want to gather experience and user feedback, this feature had to be explicitly activated to be available ; it can be done via the mockito extension mechanism by creating the file src/test/resources/mockito-extensions/org.mockito.plugins.MockMaker containing a single line:

  mock-maker-inline
After you created this file, Mockito will automatically use this new engine and one can do :

  final class FinalClass {
    final String finalMethod() { return "something"; }
  }

  FinalClass concrete = new FinalClass(); 

  FinalClass mock = mock(FinalClass.class);
  given(mock.finalMethod()).willReturn("not anymore");

  assertThat(mock.finalMethod()).isNotEqualTo(concrete.finalMethod());
In subsequent milestones, the team will bring a programmatic way of using this feature. We will identify and provide support for all unmockable scenarios. Stay tuned and please let us know what you think of this feature!

For more, take a look at the list of closed issues on GH.
## Cleaning up some old code

As the code under test evolves, grows and gets refactored there might be Stubs in the tests that aren't used anymore but no one notices because a configured mock is a used value as far as your favorite IDE is concerned. The default `MockitoJUnitRunner` and `MockitoJUnit.rule()` now detect those unused stubs. If you've got to many of those to clean them up right now there are the silent versions `MockitoJUnitRunner.Silent` and `MockitoJUnit.rule().silent()` to suppress this detection. But your code still smells.

## Additional Changes

Most developer will not notice, but those who do will most likely be happy to see that Mockito dropped CGLIB for ByteBuddy as it's mock maker engine and was thus able to get rid of some long living bugs. Additionally Mockito doesn't depend on Hamcrest anymore to avoid version conflicts. For those that need to integrate with Hamcrest, Mockito offers `org.mockito.hamcrest.MockitoHamcrest`
Mockito can spy abstract classes (with no argument constructor)