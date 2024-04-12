---
title: "Page Composing"
ring: trial
quadrant: methods-and-patterns
tags: [architecture]
---

Page composing is a way to aggregate multiple independent page fragments into one combined web page.
As an implementation of [Micro Frontends](methods-and-patterns/micro-frontends.html), this approach supports to deploy and run services agnostic to the technologies used per team.

The concept builds upon the fact that all involved services deliver valid HTML as their output.
Our solution is a small application which takes care of gathering the page fragments from all services and composing each into a defined HTML template.
A configuration layer further allows controlling which fragment gets pulled from the serving instance.

With such a page composing application in place, teams can autonomously develop, deploy and operate their service with the freedom of choosing technologies and release strategies.

Martin Fowler et al. described this as [Server-side template composition](https://martinfowler.com/articles/micro-frontends.html#Server-sideTemplateComposition).
