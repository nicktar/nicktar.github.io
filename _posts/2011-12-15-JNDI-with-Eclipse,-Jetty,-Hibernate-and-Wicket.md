---
layout: post
comments: true
title: JNDI with Eclipse, Jetty, Hibernate (and Wicket)
tags:
- apache wicket
- c3po
- hibernate
- j2ee
- jetty
- jetty-env.xml
- jndi
- jpa
categories:
- software development
- java
- j2ee
date: 2011-12-15 14:21:24.000000000 +01:00
---
In [a previous post (Sending an email programmatically via an password protected SMTP-server)] [1], I pondered about where to put the config-files for my mail server and database since all of the environments (my dev box, the test server and the production machine) use different accounts with different passwords (and partially different settings). I decided that the best place would be the webserver users home directory, which solves the problem of having different configurations on different systems but introduces a new risk of a new deploy-step needed to update changed configurations (namely added database entities in hibernate.cfg.xml) which I simply forgot more than once. Since it only happened on the test server which didn't start due to missing entities this was easy to spot, easy to fix and not a problem as such. But chances are, that this might happen with more important things that don't fail at once so there's got to be a better way, which comes by the name of JNDI (which translates to *Java Naming and Directory Interface* and not to *Just Not Directly Intuitive* which might be fitting as well).


JNDI offloads the burden of acquiring resources from your web-application to your application server. Considering that these are most likely to stay the same for each given environment this sounds like a really good idea. Additionally it allows you to separate your Hibernate configuration from your database and C3PO config which is a good idea on it's own as well.

<div style="float: right; width: 50%; border-width: 1px; border-style: solid; margin: 5px; padding: 5px;">
<strong>Excursus: <br />resource-ref vs. resource-env-ref</strong>

<hr />

resource-ref is used for “resource manager connection factory” objects. In other words, a resource-ref hands you a connection factory of some kind. Among these are <em>javax.sql.DataSource</em>s which hand you <em>javax.sql.Connection</em>s. There are others but these are beyond the scope of this article.

resource-env-ref is used for “administered objects associated with resources”, whatever that might be. It was added in EJB2.0 for MessageDrivenBeans/JMS and the only example I could find is about this use case. I don’t know if there are others… Basically nothing in resource-env-ref is more “environmentally” than anything in resource-ref but resource-jms-ref most likely didn't sound right.
</div>

At first, using JNDI seems easy enough, just add an handle for your database to your deployment descriptor (AKA web.xml)'s. Meet your first obstacle, some claim you've got to add it as a <resource-ref></resource-ref> element, others claim the <resource-env-ref>. I tried the first one and found it working and my GoogleFu hints that this is the right one too, pointing to resource-env-ref as one of the least aptly named elements of the Java universe.

A resource-ref element contains the information needed to provide the web-application with a generic handler to a yet undefined resource. The optional description, the optional res-ref-name (the handler), the required res-type (in our case javax.sql.DataSource, generally the fully qualified name of your factory class), the required res-auth (that can be container if the server should handle logging in or application if you want to do it yourselves. Here, container is a good choice) and finally the optional res-sharing-scope (which can be left out and will be left unexplained)

{%highlight xml linenos %}
<resource-ref>
    <description>Main Database Handler</description>
    <res-ref-name>jdbc/mainDB</res-ref-name>
    <res-type>javax.sql.DataSource</res-type>
    <res-auth>container</res-auth>
</resource-ref></pre> 
{% endhighlight %}

This one gives us a container managed datasource of some kind going by the name of jdbc/mainDB. The name is completely up to you. It only has to be consistent in all your configurations. Convention has jdbc-sources starting with jdbc/.

Neither you nor your application or app-server know at this point anything but that there is something called jdbc/mainDB, which is a javax.sql.DataSource that will be provided and logged in by your container. To enable your container to do so, it'll need a little more on the side of information on how to do so. That'll be our next step.

With Tomcat, this information would go into the context.xml but with Jetty, we need a jetty-env.xml, which is, by default, inconveniently located in the application's WEB-INF folder. This is inconvenient, because this will be deployed along with the application and the main reason for this exercise was to separate the database config from our deployment. For now this is OK, at least for me, since only my development environment is powered by Jetty, so the testing and production machines will simply ignore this file. But this smells and has to be changed later on (not within the scope of this post).

So let's take a look at the jetty-env.xml: 
{%highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Configure PUBLIC "-//Mort Bay Consulting//DTD Configure//EN"
    "http:/<!-- -->/jetty.mortbay.org/configure.dtd">

<Configure class="org.mortbay.jetty.webapp.WebAppContext">
    <New id="mainDB" class="org.mortbay.jetty.plus.naming.Resource">
    <Arg></Arg>
    <Arg>jdbc/mainDB</Arg>
    <Arg>
         <New class="com.mchange.v2.C3PO.ComboPooledDataSource">
                 <Set name="driverClass">com.mysql.jdbc.Driver</Set>
                 <Set name="jdbcUrl">jdbc:mysql://localhost/main</Set>
                 <Set name="user">dbuser</Set>
                 <Set name="password">secretPassword</Set>
        </New>
    </Arg>
    </New>
 </Configure></pre> 
{% endhighlight %}

Most of this file is pretty similar across the different uses. The id in line 5 is any id of your choice, while the value of the Arg-element in line 7 has to match the res-ref-name. Line 9 reveals, that this isn't plain Hibernate but Hibernate with C3PO. All the other values should be mostly self explaining. I don't know if the empty Arg-element in line 6 is really needed but since this maps to an api-call for Jetty, it seems reasonable.

Now that our container is aware of the database connection details (or to be more exact aware of how to delegate the creation of a database connection) and our application is aware that there is some kind of database connectivity provided under a given name, the last evident step is to make our favorite orm framework aware of this. It's the most rewarding part of the whole operation since it consist mainly of deleting tedious stuff... All the connection details and C3PO settings need to be removed from the hibernate.cfg.xml. In case of the C3PO settings they need to be moved to out jetty-env.xml but that shouldn't lessen the fun.

{%highlight xml linenos %}
<property name="hibernate.connection.datasource">java:comp/env/jdbc/GwaDB</property>
{% endhighlight %}
 
That's the only new line that has to be added to the xml. Save and recapitulate... 

1. Create some handler for our database - *check* 
2. Provide Jetty with all the information on how to connect to the db - *check* 
3. Tell Hibernate where to find the connections - *check* 

So everything is done and we should be good to go, but nooo... At least in my case this didn't do the trick. The Jetty-Plugin that comes with wicket (and you were wondering where the wicket edge would be) doesn't seem to be up to the task. The web points to jetty plus which is discontinued to solve the problem but I don't feel comfortable using discontinued components. There is a successor project for Jetty-Plus called [Run Jetty Run](http://code.google.com/p/run-jetty-run/) which, in the latest version does the job.

Even with everything up and running, Hibernate reports no JNDI at startup. This might be because I use and configure C3PO via JNDI and Hibernate is most likely unaware of that or this applies to another level of JNDI.

[1]: {% post_url 2011-04-24-Sending-an-email-programmatically-via-an-password-protected-SMTP-server | absolute_url%} 
            "a previous post (Sending an email programmatically via an password protected SMTP-server)"          