---
title:      "Ports and Adapters"
ring:       trial
quadrant:   methods-and-patterns

---

Ports and Adapters is an architecture or layering approach for software design. As with other layering approaches, it seperates different concerns in different layers, where dependencies are only allowed from the outside to the inside.

We use "ports and adapters" with success for (larger) applications, which contain certain business logic and/or provide several ways to access the services.
We often use the approach hand-in-hand with Domain Driven Design. In comparison with other layering patterns (e.g. layered architecture) it allows you to have a true technology-free core (domain) model. Why? Because, with the concept of "secondary ports" (=interfaces), it inverts the control and allows outer layers to provide adapters (=implementations of the defined interface).
It also defines clear boundaries regarding where to put what logic of your application.

You can find out more about the details and its origins in well-known blog posts such as [The Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) or [Hexagonal architecture](http://alistair.cockburn.us/Hexagonal+architecture)

In short, here is how we often layer such applications:
* Domain:
    * Is the inner layer and contains the technology-free domain model
    * Often uses building blocks from Domain Driven Design
    * It defines primary and secondary ports. (E.g. a secondary port is in "interface" that needs to be implemented in the infrastructure layer.)
* Application:
    * Contains the Application's API and Services, that are developed around the use cases in the application requirements.
    * These use cases orchestrate the flow of data to and from the domain
* Interfaces:
    * Contain everything required to convert data from the format most-convenient for the use cases (e.g. in the application layer) to the format required for external agency/access
    * e.g. (Web) Controllers / DTOs for handling forms, etc.
* Infrastructure:
    * This layer is where all the (technical) details live. (The database and persistence is a detail, the communication format and mappings with external services is a detail, etc.)
    * In this layer you typically have adapters for the secondary ports that have been defined in the layers below. (e.g. an Implementation of a Repository interface from the Domain layer)

These layers belong to every bounded context (modules) inside the application.

Are you searching for a potential timeless architecture for your critical application? Try implementing a potent technology-free domain model in the core layer and use ports and adapters to layer your application.
