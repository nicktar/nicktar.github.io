---
layout: post
comments: true
title: Nasty HashMap...
tags:
- common pitfall
- equals
- hashcode
- java
- map
- puzzler
- software development
date: 2011-09-27 10:17:47.000000000 +02:00
---
... or why hashCode() and equals() should be calculated on immutable parts of your keys only and what happens if you don't.


Imagine a situation where you've got a Map like this: HashMap. You populate your map, work with your BusinessObjects (lazy load some more values), using the same objects you put into your Map and then you can't find them any more. The keySet of the map contains the object, hashCode and equals affirm that this is the BusinessObject, you want, they are the very same objects as even == returns true but containsKey returns false and get returns null... WTF?

If at some point you'll get too confused or the occult inner magic of java.util starts to scare you, just skip ahead to the summary.

{% highlight java linenos %} 
import java.util.HashMap;
import java.util.Map;
import junit.framework.TestCase;

public class Demo extends TestCase {
    public void testMap() {
        Map<DomainObject, String>; map = new HashMap<>();
        DomainObject sb = new DomainObject();
        map.put(sb, "Some value");
        System.out.println(map.containsKey(sb));
        sb.value = "Some Text";
        System.out.println(map.containsKey(sb));
    }
    private static class DomainObject {
        public String value = null;
        @Override
        public int hashCode() {
            final int prime = 31;
            int result = 1;
            result = prime * result + ((value == null) ? 0 : value.hashCode());
            return result;
        }
        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;
            DomainObject other = (DomainObject) obj;
            if (value == null) {
                if (other.value != null)
                    return false;
            } else if (!value.equals(other.value))
                return false;
            return true;
        }
    }
}
{% endhighlight %} 

*Question*: What gets printed?
 
To understand what's going on, one has to dive into the inner workings of HashMap... The HashMap is used to store key value pairs but it does so by combining them into an Entry-object containing both objects and stores these in an array. So when you call put on an HashMap (for simplicity assuming your key isn't null) first the hashCode() function of your key is called. Then HashMap works it's magic. It moves the hash to the left by 9 bits (multiplies with 512 and might switch the sign of the number a couple of times. Then the result is complemented (each bit shifted) and added to the original hash value. Then it shifts the result (including the sign) to the right by 14 bits, adding 0 to the left side and sets the intermediate result to a bitwise xor of this shifted value and the sum of the last step. Then it repeats the first step but shifting only by 4 bits (multiplies with 16) and omitting the compliment and repeats step 2 with a right shift of 10 bits.

OK, that should leave everyone (including me) confused. Let's try to shed some light...

*Example*:

The hashCode-function of your object returns 31 (a very plain object using a very plain hashCode implementation).
 
{% highlight java linenos %} 
int h = 31;
System.out.println(h + " - " + Integer.toBinaryString(h)); // 31 - 11111
h += ~(h << 9);
System.out.println(h + " - " + Integer.toBinaryString(h)); // -15842 - 11111111111111111100001000011110
h ^=  (h >>> 14);
System.out.println(h + " - " + Integer.toBinaryString(h)); // -246303 - 11111111111111000011110111100001
h ^=  (h >>> 10);
System.out.println(h + " - " + Integer.toBinaryString(h)); // -3947794 - 11111111110000111100001011101110
{% endhighlight %} 

That leaves us with an internal hash of -3947794 and no idea what it's good for. But the HashMap isn't done yet. I computes an index based on this value and a bitwise and of the length of the internal table -1. Starting from that index the map iterates through the entries. Yes, these nasty little buggers form a linked list by containing a next-reference. For each iteration it checks if 
1. the recorded internal hashCode matches the internal hashCode of the new key and
2. the key is identical or equal to the stored key.

If a matching key is found, the value is replaced. If no matching key is found, it adds the new entity object at the start of the linked list of the computed table index and maybe resizing the table and redistributing the buckets.

To retrieve a value the key is submitted to the very same steps but since the internal hash isn't recalculated whenever the key-object changes, the changed key yields a different internal hash, and a different internal bucket (that's what the linked lists are) and will not be found.

*Summary*:

When storing a value to a specific key in a HashMap, the corresponding hashCode is computed and stored. If you later change your key-object in a way that changes it's hashCode, these will no longer match.

*Solution*:

{% highlight java linenos %} 
true 
false
{% endhighlight %} 
