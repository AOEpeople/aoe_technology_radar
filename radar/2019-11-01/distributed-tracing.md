---
title:      "Distributed Tracing"
ring:       trial
quadrant:   platforms-and-aoe-services

---

Distributed Tracing creates visibility over processes spanning multiple applications.
In a microservice world where a request or operation involves multiple applications it is helpful to have an overview of what system is involved, at what point.
Also visibility of communicated data and errors helps to quickly identify issues in a microservice environment.
Our tool of choice is [Jaeger](/platforms-and-aoe-services/jaeger.html) with [B3 Propagation](https://github.com/openzipkin/b3-propagation).
