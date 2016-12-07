---
layout: post
title: SOTP (State of the Project) - January/February 2013
tags:
- apache wicket
- sotp
- wicket
- wicket-crudr
date: 2013-02-13 11:13:55.000000000 +01:00
comments: true
---
Sorry for posting this quite late or missing the January update (depending on the point of view). The new year started with a high workload at the office so that there weren't many days were I wanted to continue working at home. So this is pretty short.

The ```@Lister``` Annotation is gone and the ```@Editor``` Annotation is about to follow. This reduced the code base only a little but produced Prototypes with a higher readability. Prototypes are the classes of entities that CRUDr displays. These classes have to be annotated using the ```@Prototype``` Annotation.


I'm currently thinking about pre releasing an alpha version with the readonly components implemented.

Here's a short code sample of a Prototype. All that's really needed is the Prototype Annotations and getters for all properties you want to display. The ```@Order``` Annotation isn't strictly needed but it's highly recommended to use it. CRURr uses reflection to access and inspect the prototypes and if there is no Order Annotation present it uses the order as it's returned by Class.getMethods(), which is undefined.

{% highlight java lineno %}
@Prototype
public static class PetWrapper implements Serializable {

    private Pet pet;

    public PetWrapper(Pet pet) {
        this.pet = pet;
    }

    @Order(1)
    public String getHumanReadableId() {
        return pet.getName() + " (" + pet.getType().getName() + ")";
    }

    @Override
    public String toString() {
        return "Pet: " + getHumanReadableId() + " - Owner: " + pet.getOwner();
    }

}
{% endhighlight %}

This prototype will only display a human readable id of a Pet object. It's a reduced snippet of the Owner-Display-Page of the PetClinic demo project.