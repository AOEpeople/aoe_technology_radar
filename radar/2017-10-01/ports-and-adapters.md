---
title:      "Ports and Adapters"
ring:       trial
quadrant:   methods-and-patterns

---

Ports and Adapters is an architecture or layering approach for software design. As with other layering approaches it seperates different concerns in different layers, where dependencies are only allowed to be from the outside to the inside.

We use "ports and adapters" with success for (bigger) applications which contains certain business logic and/or provides several ways to access the services.
We often use it hand in hands with domain driven design. In comparison with other layering patterns (e.g. layered architecture) it allows to have a true technologie free core (domain) model, because with the concept of "secondary ports" (=interfaces) it inverts the control and allows outer layers to provide adapters (=implementations of the defined interface).
It also defines clear boundaries for where to put what logic of your application.

You can find more about the details and its origins in famous blog posts like [The Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) or [Hexagonal architecture](http://alistair.cockburn.us/Hexagonal+architecture)

In short here is how we often layer such applications:
* Domain:
    * Is the inner layer and contains the technology free domain model
    * Often using building blocks from domain driven design
    * It defines primary and secondary ports. (E.g. a secondary port is in "interface" that need to be implemented in the infrastructure layer.)
* Application:
    * Contains the Applications API and Services, that are developed around the use cases in the application requirements.
    * This use cases orchestrate the flow of data to and from the domain
* Interfaces:
    * set of adapters that convert data from the format most convenient for the use cases to the format most convenient for some external agency/access
    * e.g. (Web) Controllers / DTOs for handling forms etc
* Infrastructure:
    * This layer is where all the details go. The Web is a detail. The database is a detail. We keep these things on the outside where they can do little harm.
    * This is where you can use frameworks and tools such as the RDB Mappers etc.
    * communication details with other external systems (and its DataTransferObjects and Mappers)

This layers belong to every bounded context (modules) inside the application.

So if you are searching for a potential timeless architecture for your critical application? Try to implement a potent technology free domain model in the core layer and use ports and adapters to layer your application.