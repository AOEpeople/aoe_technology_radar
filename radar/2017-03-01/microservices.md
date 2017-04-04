---
title:      "Microservices"
ring:       trial
quadrant:   methods-and-patterns

---


Microservices as an architecture style is getting very popular recently. At AOE, more and more teams are adding microservices to their existing application architecture or designing applications with microservices.

We also like the term "self-contained systems" instead of microservices.

The benefits we see are:

*  better handling of complexity compared to adding features in a monolithic approach
*  beeing able to use the languages and framework that best fit the purpose of the service
*  enabling better parallel work in big teams or multi-team projects
*  flexibility in deploying changes to production - by just deploying the changed service

Related patterns are [Strategic Domain Driven Design](/methods-and-patterns/strategic-domain-driven-design.html) as an approach to wisely cut your architecture according to useful bounded contexts and decide on the relevant communication and "translation" between the services.
In case you are looking for a small visualisation tool for your microservice architecture you might find [vistecture](https://github.com/AOEpeople/vistecture/) useful.

Also [Resilience thinking](/methods-and-patterns/resilience-thinking.html) is especially important when designing an application as a suite of microservices.
