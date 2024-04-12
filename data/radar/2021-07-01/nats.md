---
title: "NATS"
ring: assess
quadrant: tools
featured: true
tags: [architecture, devops]
---

[NATS](https://nats.io/) is a cloud native messaging and stream-data system for modern distributed software systems.
Two [design-goals](https://github.com/nats-io/nats-general/blob/master/architecture/DESIGN.md) were simplicity and performance.
These are adopted by selecting [golang](https://golang.org/) for the server implementation and reducing the memory footprint for both: server- and client-side.
The server-side provides simple and efficient horizontal scaling (e.g. deploying it inside Kubernetes) and the small client-footprint allows us to use it in embedded-systems, edge-computing and IoT devices e.g. for command and controll use-cases.
Also, the long list of existing [integrations](https://docs.nats.io/compare-nats#integrations) and the plugin-systems bring a great flexibility.
