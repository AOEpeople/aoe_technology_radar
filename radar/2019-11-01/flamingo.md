---
title:      "Flamingo"
ring:       adopt
quadrant:   languages-and-frameworks

---

Flamingo is a high productivity go based framework for rapidly building fast and pluggable web projects.
It is used to build scalable and maintainable (web)applications.

Flamingo is:

* open source
* written in go
* easy to learn
* fast and flexible

Go as simple, powerful and typesafe language is great to implement and scale serverside logic.
Flamingo has a clean architecture with clear dependencies in mind and offers a typical features and support for nowadays web applications:

* Powerful Templating Engines. E.g. support for Pug templates with reusable mixins and lightweight scripting.
* Configuration concepts using yml and support for multiple areas and contexts
* Powerful Dependency Injection
* A Module concept for building modular and pluggable applications
* Authentication concepts and security middleware
* Flexible routing with support for prefix routes and reverse routing
* Web Controller Support with: Request / Response / Form Handling etc
* Operational Readyness: Logging, (distributed) Tracing, Metrics and Healthchecks with seperate endpoint
* Localisation
* Commands
* Sessionhandling and Management
* GraphQL support and therefore support to build nice SPA and PWAs on top of it
* Resilience and Caching for external APIs calls.

Flamingo itself does not contain ORM Mapper or libraries - instead it emphasizes ["ports and adapters"](/methods-and-patterns/ports-and-adapters.html)  architecture - so that you have a technology free (domain) model and any possible (and replaceable) persitence behind it.
That makes Flamingo useful to build microservices and applications - especially to build "frontends" or portals that require interaction with other (micro) services in a distributed architecture. 
When sticking to the architectural recommendation you can build modular applications with replaceable adapters that gives you independed testability.

With **"Flamingo Commerce"** there is an additional active projects that offer rich and flexible features to build modern e-commerce applications.
