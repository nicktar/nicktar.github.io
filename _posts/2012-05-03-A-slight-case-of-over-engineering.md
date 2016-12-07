---
layout: post
title: A slight case of over-engineering
tags:
- apache wicket
- crud
- scaffolding
- wicket
- wicket-crudr
date: 2012-05-03 18:45:14.000000000 +02:00
comments: true
---
When I set out to create Wicket-CRUD, I envisioned a small and lightweight set of components that would deliver all the basic scaffolding options to Wicket. Right now I'm not so sure about the lightweight-part. I's still a small set of components (a table-component, an editor, some Annotations and an Interface) with a small API. I don't know when I started on the path of over engineering but I think right now I'm committed to it (at least for this project). Two collumn-types collectiong their various parts to provide all the functionality from several providers created by a couple of factories, kept together (and apart) by no less than 8 Interfaces... All in all the project contains some 50 code-files and it's still growing. 


For those interested, I set up the project on ohloh.net <a href="http://www.ohloh.net/p/wicket-crudr?ref=WidgetProjectPartnerBadge"><img border="0" height="33" width="193" align="right" alt="Ohloh project report for wicket-CRUDr" src="http://www.ohloh.net/p/wicket-crudr/widgets/project_partner_badge.gif" /></a> so you can have a look. I'd strongly advice against using any of this at this moment, since the code is still constantly changing and growing.
