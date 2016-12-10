---
layout: post
comments: true
title: On personal data, passwords and their storage
tags:
- attack
- best practice
- breach
- hash
- mitigation
- password
- personal data
- rant
- salt
- security
- side-channel
- software development
- storage
date: 2011-10-21 14:47:06.000000000 +02:00
---
With the continuous stream of reports about hacked websites it never fails to baffle me, that these sites still fail to take even the simplest steps to protect their user's passwords. Storing them in plain-text in your database isn't secure, you could as well just post them on your main page. But still the published database dumps don't stop to contain these. Are these developers just ignorant or incompetent? Are these old legacy apps once developed by overpaid consultants and not updated ever after? Maybe it's like Marcus Carey (security researcher & community manager at Rapid7) said: "Many businesses outsource web application development and once the application is deployed, service contracts may lapse or IT staff may not be paying much attention to them." I don't know and most likely I never will.


O.K. maybe it's just how you look at things. If you consider your system safe, you wouldn't want to waste time to crypt the data "that never gets stolen". But your system isn't safe. It never will be. There are way to many points of failure in every part of your operating system, your database, all of your services and 3rd party tools and whatnot. Each and every one of those might be used to compromise your system security. You can make it hard to break your system. Maybe, you can even make it hard enough to discourage some crackers but if one day, someone finds an unknown vulnerability that can be used automatically, your database will be stolen faster than you can say "what's that?". And this is not about your precious system. This is about your users, your customers, those who trust you with their personal data and their passwords. Thus there is only one perspective that isn't most likely to betray their trust: *Consider everything on the net to be stolen sometime.*
 
Your job as a developer is to make the loot as useless or hard to use as possible (while still making it hard to get). Just ask yourself: Do you really need your customers postal or email address on the webserver? Can't you store it on a back end system that's not connected to the net all day long? Can't you create a simple job that polls your webserver every few minutes to check if there is a "forgotten password email" to  send? German law knows the concepts of "data reduction and data economy" that should be best practice anyway. In short terms it says:
 
If you don't really need this piece of personal information, you're not allowed to request or store it.

If you don't really need this piece of personal information any more, you've got to delete or anonymize it (with a reasonable effort).
 
Following these two rules, will reduce your data stash and it's worth if you plan to sell this data. But it will also reduce the gain, criminals may have when your data stash is stolen. Depending on your definition of a reasonable effort that means that you maybe shouldn't keep any information not crucially to the operation of your application on the webserver but transfer it to a backend system behind a firewall at least.

While there might be an argument about the reasonability of the effort for email or postal addresses there can't be one about storing passwords in plain text. But even if you don't want to aim for the highest security in password (I don't know if maybe you should) the basic steps are way to easy not to go them.
 
The first step would be to store not the passwords but hashes of these passwords. But the md5 algorithm, even if it's used by most of the applications isn't up to the task any more. It's designed for speed and what's a big bonus at the first glance is it's downfall when examined closer. While your application uses only a fraction of it's cpu time to log in users or change their passwords, all a cracker wants to do is brute-force them. Thus expanding the time needed to calculate the hash to a give password thousandfold doesn't hurt you really, the user only 
waits the fraction of a second longer for the server answer while the cracker can only try 1/1000 of the keys per second. So slowing the process down helps as long as this isn't archived by adding waiting cycles but real operations.
 
Additionally by simply hashing passwords two users with the same password share the same hashed password too so an attacker with access to the database and an account on your system would get every account with the same password for free. Considering that an disturbingly large number of users users still use passwords from a pool of about 20 worldwide ("123456" and "iloveyou" being among the top 10, data compiled from a breach of [rockyou.com in 2009] [1]) that can reveal quite a lot of accounts on a bigger system. The same goes for passwords hashed with an application-wide salt but lets take a step back.

Hashing passwords with a salt is a great idea. It solves several of our problems at once. Adding a salt to the password makes it stronger. Adding a unique salt makes the hashes unique for identical passwords. This salt hasn't to be secret, it just has to be random (or as random as you can get on a computer). A password of "p455worD" will be broken by a small rainbow table within seconds. Adding a couple (like 20) of known but random characters would expand the rainbow table needed by several terabytes, making this approach impractical for the cracker. Adding 
more characters adds more security (that's as simple as it seems). Unique salts even help to prevent dictionary attacks on a stolen database. With no or a global salt, a cracker simply has to hash each  dictionary entry and will find every matching account by matching hashes. A unique salt forces a hash for every single account in the database.

Another attempt to make the hashes more secure is a technique known as "key stretching" or (wrongly) as "key strengthening". This approach takes into consideration the key length, the key space (unique characters in the key) and the pseudo randomness of their distribution as well as the time the algorithm needs to complete and it's simple as hell...

Just salt your key with a strong salt (as random as possible, unique and long enough) and hash it. Take the hash, salt it (with the same salt) and hash that string again. Repeat the last step (hashing the  salted result of the last step) a couple of times (OpenSSL's passwd uses 1000 iterations of the md5 algorithm showing that with a little help md5 still does the trick).

**EDIT:** Did the trick in 2011

**Conclusion**:

To keep your users personal information safe, don't store it on your webserver if you don't really need to.

Passwords ARE personal information. Make sure to anonymize them by storing only hashes. Make sure it's really anonymized by using a strong algorithm, key stretching unique and strong salts and hash multiple times to slow the cracker down.

**After-thought**:

When checking if a password is legit, always run through the whole procedure even if the account name is unknown or the account is deactivated. Failing to do so might help a cracker to guess legitimate account names (since unknown account names would return faster). This form of attack is known as side-channel attack.
 
**2nd after-thought**:

Never ever encrypt the passwords in a way that can or will be decoded by your application. When doing so, all an attacker has to do is to break your applications key to make of with all the loot. No use in making thinks to easy.

**Edit**:

I just found an [article at the code mechanic] [2] a little bit older than this one with some nice bits of information on hashing algorithms and their use to keep passwords safe.
                    
[1]: "http://www.imperva.com/docs/WP_Consumer_Password_Worst_Practices.pdf"
[2]: "http://thecodemechanic.wordpress.com/2011/06/06/introduction-to-strong-cryptography-p0/"