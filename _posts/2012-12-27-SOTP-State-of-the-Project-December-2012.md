---
layout: post
comments: true
title: SOTP (State of the Project) - December 2012
tags:
- scaffolding
- sotp
- status
- wicket-crudr
date: 2012-12-27 16:31:40.000000000 +01:00
comments: true
---
I was finally able to track down the elusive bug mentioned in last month's SOTP, where 1:n relationships weren't displayed correctly after the model of the master component got changed. Since they weren't updated along with the rest of the displayed data, I was hunting for the place where the model chain was broken. As the model chain was in fact unbroken, this search took me a couple of days but didn't help at all. The reason why the data wasn't displayed corretly was the fact that these relations were constructed with a wrong type of model provider and thus a properly chained but completely wrong model was used. Now it kind of works but this spot needs more work done before I'm happy with this.

As a lookout, Wicket-CRUDr will see a change of paradigm. Right now, everything you want scaffolded has to be annotated and everything you want to edit has to be annotated to. This will change so that every method on the wrapper starting with &quot;get&quot; or &quot;is&quot; will result in this property displayed unless annotated with @Ignore and likewise every method starting with &quot;set&quot; will result in this property beeing editable unless ignore-annotated.


To make things a little less abstract: 
Wicket-CRUDr uses three main components. 

1. A single-entity-display, showing the properties of the supplied model. It offers the possibility to use in-place-editing by using AjaxEditableLabels if setters are present and the feature isn't deactivated. 
2. A multi-entity-display, doing the same for lists of models 
3. A single-entity-editor, providing editing functionality if AjaxEditing isn't desired or approprate. 

Wicket-CRUDr is intended to be used with wrapped models. As the POJOs in use by Hibernate and other data providers are already heavily annotated in most cases further annotations on these classes would drastically reduce code readability. Additionally using differently annotated wrappers for one entity type provides an easy way to create different viewers and editors based on different privileges by just extending and overriding wrappers.
 
I'll provide some demo code soon, I promise...<br /></p></div>