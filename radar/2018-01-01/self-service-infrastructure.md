---
title:      "Self-service infrastructure"
ring:       assess
quadrant:   methods-and-patterns

---

With growing teams, growing projects and growing infrastructures, we decided to follow the "You build it, you run it" approach, and when we started to run Kubernetes, where we have a great abstraction layer between infrastructure and applications, we decided to make the developer teams write their own Helm charts.
By agreeing on just a couple of patters, this allows us to easily manage a microservice architecture with more than 60 Applications, without too much hassle managing infrastructure/runtimes for (among others) JVM, Go and PHP applications.
Most of the hosting/provisioning decisions are better kept within the team, as the teams know how their applications work. By providing a clear interface, this became the cornerstone for running our microservice architecture, and keeping the amount of actual servers much lower than in projects with a centralized operations/IT team.

Eventually, self-service infrastructure, and "You build it, you run it", allowed us to give both our application developers as well as our infrastructure engineers more flexibility than one team explaining to another team what to do, resulting in a better collaboration than before.
