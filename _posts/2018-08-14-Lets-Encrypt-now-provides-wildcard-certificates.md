---
layout: post
tags:
    - security
    - devops
    - ssl
categories:
- devops
- security
- encryption
title: Let's Encrypt now provides wildcard certificates
date: 2018-03-14 18:24:26.000000000 +01:00
logo: assets/le-logo-standard.png
---
<img src="{{ "assetsle-logo-standard.png" | absolute_url}}" align="right" width="320px" style="padding-right:5px" />Josh Aas, ISRG Executive Director at ISRG, the entity behind [Let's Encrypt](https://www.letsencrypt.org) the free automated and open Certificate Authority [announced](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579) that they're now providing wildcard cerificates. While they had planned to do so starting in February, they had to postpone this feature due problems with their TLS-SNI domain validation that tied up a lot of their developer resources and prevented them from testing the ACME 2.0 protocol required for wildcard certificates.



Now after a delay of about one month, it's possible to obtain cerificates for *.example.com that are valid for every subdomain of example.com. This reduces the amount of certificates admins have to manage and makes it easier to work with Public-Key-Pinning where you don't want any rapid changes of certificates.

There are two requirements you've got to meet in order to obtain such a certificate. First, you've got to prove ownership of the domain in the form of a TXT-Record on the domains DNS entry and second, you have to use a Let's Encrypt client that supports ACME 2.0. There are still clients out there that don't but Let's Encrypt provides a [list of clients](https://letsencrypt.org/docs/client-options/) that do and not very suprisingly the recommended and easy to use [Certbot](https://certbot.eff.org/) client is on that list, along with many others like [ACME4J](https://github.com/shred/acme4j), the [APIv2 branch of GetSSL](https://github.com/srvrco/getssl/tree/APIv2) and [ZeroSSL](https://hub.docker.com/r/zerossl/client/).