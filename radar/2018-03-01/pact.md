---
title:      "PACT"
ring:       trial
quadrant:   tools

---

PACT (http://pact.io/) is a family of frameworks that provides support for *Consumer Driven Contract testing* accross different langauages and frameworks.

Consumer Driven Contract testing is a pattern for testing interfaces/boundaries between services.

It allows "consumers" to run tests against a defined Mock and record the defined interactions (=PACT).
It puts "providers" in the position to run the PACT tests inside theire Continuous Integration Pipelines, so that the provider knows if he might break any consumers.

This approach makes sense in organisations where teams collaborate more closely (See [Strategic Domain Driven Design](/methods-and-patterns/strategic-domain-driven-design.html) ), e.g. to build [Microservice oriented architectures](/methods-and-patterns/microservices.html)

Consumer Driven Contract Testing and how it can be conducted with PACT is documented very nicely on the official PACT website: https://docs.pact.io/.
