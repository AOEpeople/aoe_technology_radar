---
title:      "Strategic Domain Driven Design"
ring:       adopt
quadrant:   methods-and-patterns

---

Design of distributed applications need to be done wisely. Strategic Domain Driven Design is an approach for modelling large-scale applications and systems and is introduced in the last part of Eric Evans' book _**Domain Driven Design**_.

Domain driven design is a well-known pattern family and has been established at AOE for quite some time now. Unlike Domain Driven Design, which focuses on the tactical design in an application, strategic domain driven design is an approach that is very helpful for the high-level strategic design of an application and distributed software architecture.

It is a pattern familiy focused on using and defining Bounded Context and thinking explicitly of the different relationship patterns and the required "translation" of similar "concepts" between the bounded contexts. It is helpful to argue and find a good strategic architecture in alignment with the requirements, the domain and by considering Conway's Law.
A context map and a common conceptional core help to understand and improve the overall strategic picture. Especially with the [Microservice](/methods-and-patterns/microservices.html) approach, it is important to define and connect services following the low coupling - high cohesion principles by idendifying fitting bounded contexts.

The following chart gives an overview of possible relationships between bounded contexts:
![strategic-domain-driven-design-relationships](/assets/images/strategic-domain-driven-design-relationships.png)


While we have found that this approach is especially useful in designing distributed systems and applications with [microservices](/methods-and-patterns/microservices.html), we have also extended this approach to provide guidlines for general enterprise architectures.