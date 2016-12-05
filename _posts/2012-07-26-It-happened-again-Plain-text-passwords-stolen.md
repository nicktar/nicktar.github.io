---
layout: post
title: It happened again - Plain-text passwords stolen
tags:
- fail
- personal data
- rant
- salt
- security
date: 2012-07-26 09:12:18.000000000 +02:00
---
Today another case of criminal grade thoughtlessness made the (german) [IT news](http://heise.de/-1652304). The on-line dating platform [meetOne](http://www.meetone.com/) was found to grant access to data like "childrenNumber", "schooling", "yearlyIncome", "sexuality"  and "searchOneNightStand" or the plain-text password along with the matching email address of everyone to anyone who was able to change a single URL-Parameter. This change was a simple increase or decrease of a number not some fancy CrossSiteScripting-style JavaScript- or math-voodoo. 

So they are not only storing passwords in plain-text or encrypted (not salted and hashed), they weren't even validating the user input needed to access this data. What's even worse, in a statement Nils Hennig, founder of meetOne and manager of meetOne GmbH, a servicer to meetOne International LLC, the company behind meetOne, told the paper, that "no sensitive data [...] could be accessed".

How in hell isn't ones sexuality, the yearly income, every message one sends or receives on their page, ones interest in a one night stand, ones private photos and the password, that's most likely in use on countless other services "sensitive data"?
