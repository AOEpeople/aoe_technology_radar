---
title: "Service Mesh"
ring: assess
quadrant: platforms-and-operations
tags: [architecture, devops, security]
---

**Service Mesh** is a solution which makes service to service communication more comfortable and more secure in large microservice architectures.
It decouples the routing part from the microservices which allows a service mesh implementation to offer features like:

- Service Discovery (canary routing, a-b testing, etc.)
- Resilience (circuit breaking, timeouts, etc.)
- Observability (route metrics, traffic logging, etc.)
- End-to-end encryption (mTLS)

service mesh implementations:

- [Istio](https://istio.io/)
- [Open Service Mesh](https://openservicemesh.io/)
- [Kuma](https://kuma.io/)
- and many more...

At DCX we are using service meshes in multiple projects and are assessing best-practices and service mesh implementations.
