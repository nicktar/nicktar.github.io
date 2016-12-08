---
layout: post
title: Sending an email programmatically via an password protected SMTP-server
tags:
- dependency injection
- email
- java
- mail api
- smtp
- software development
- unittest
date: 2011-04-24 21:26:26.000000000 +02:00
---
Most tutorials show how to either load the mail-properties from a file or setting them programmatically. These properties include an user name and a password to an SMTP-Server but connecting to said server fails if the server requests an user name and a password to connect. So setting these properties isn't sufficient. Digging deeper reveals a solution that isn't part of the most tutorials or even mentioned in most of the books like [this one](http://openbook.galileodesign.de/javainsel5/javainsel16_010.htm) (German), albeit it's not the current edition but the one with the highest Page-rank in Google and the description was fixed in a [later edition](http://openbook.galileodesign.de/javainsel7/javainsel_17_012.htm) and for some reason removed in the [current](http://openbook.galileodesign.de/javainsel).


But enough talk on to the good stuff:

Personally I prefer to put such configurations in separate properties-files since they're not exactly code and it might be necessary to change them without the need for a new release. Since I usually run my software as a service and don't hand out the packages I think the best place for such files isn't the resources directory which ends up inside the war archive but the tomcat-user home directory, where I can change them whenever I feed like.

So, what does this file look like? 

{% highlight linenos %}
# Configuration file for javax.mail
# If a value for an item is not provided, then
# system defaults will be used. These items can
# also be set in code.
 
# Host whose mail services will be used
# (Default value : localhost)
mail.host=my.smtp.server
 
# Return address to appear on emails
# (Default value : username@host)
mail.from=default@default.org
 
# Other possible items include:
mail.user=emailLogin
mail.smtp.host=my.smtp.server
mail.smtp.port=
mail.smtp.user=emailLogin
mail.debug= true
mail.smtp.auth=true
mail.password=secret
{% endhighlight %}

There are some obsolete settings in this example but it works nevertheless. The mail.host-setting set's the default mail host for all protocols while the mail.smtp.host-setting defines the host for SMTP  transports. Other protocols can be defined in the same manner. Unfortunately the code to actually send mails isn't that straightforward but still easy enough once figured out.
 
{%highlight java linenos %}
public class Mailer implements IMailer {

    private static final transient Logger logger = Logger.getLogger(IMailer.class);

    public void sendMail(String toAddr, String subject, String body, final Properties props) {
        Authenticator auth = new Authenticator() {

            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(props.getProperty("mail.user"),  props.getProperty("mail.password"));
            }
        };

        Session session =  Session.getDefaultInstance(props, auth);
        MimeMessage mail = new MimeMessage(session);
        try {
                mail.addRecipient(Message.RecipientType.TO, new InternetAddress(toAddr));
                mail.setSubject(subject, "UTF-8");
                mail.setText(body, "UTF-8");

                Transport.send(mail);
                logger.debug("Message sent: "+ mail.toString());
        } catch (AddressException e) {
                logger.error("Something's wrong in address land: ", e);
        } catch (MessagingException e) {
                logger.error("Something's wrong in mail land: ", e);
        }
    }
}
{% endhighlight %}

So what's all this? First the IMailer interface... It's not nessecary or even available. It's just a little Interface, so that I can inject a different mailer-implementation for Unit-Tests that doesn't really send out mails. Then I provide the recipient address, the subject, the mail-body and the properties via the constructors. Sure I could just load the properties here but that way I can keep them cached in my application class and don't have to re read then over and over. I just have to make sure, there is some mechanism to force a re-read in case I need to change something and don't want to restart the whole application. Then we need an Authenticator. That's the part that's missing in most places. We just return a new PasswordAuthentication instance with the user and password from the properties. Please note that it's hardcoded which properties will be used, if you defined different servers and users for the different protocolls you might have to change this part a little bit. Then we obtain a mailsession from the magic black box using our properties and authenticator. Finally we construct our message and send it. Here, the sender address from the properties is used but you can set another one programatically as well.

In the end all that's left to do is a little logging and catching some exceptions we'll hopefully never see once we got this running.