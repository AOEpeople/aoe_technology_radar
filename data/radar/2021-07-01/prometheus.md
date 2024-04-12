---
title: "Prometheus"
ring: adopt
quadrant: platforms-and-operations
tags: [devops]
---

[Prometheus](https://prometheus.io) is an open-source monitoring and alerting system.
It was the second project within the CNCF which reached the "graduated" status and has since seen a large rate of adoption across many CNCF projects.
It primarily utilizes a pull-based metrics flow through HTTP which allows the easy integration of a variety of application-specific metrics sources.
Compared to other monitoring systems it stands out in its simple, still powerful and fully code-based configuration and the equally powerful service discovery mechanism.

Prometheus integrates very well with Grafana which is our tool of choice for dashboard visualization.
Through the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator) project, the monitoring system can be configured through Kubernetes custom resource definitions.
These can be shipped by development teams alongside with their application deployments and allow [sharing responsibility](https://www.aoe.com/techradar/methods-and-patterns/shared-responsibility.html) for monitoring tasks between operations and engineering teams with a clear interface.

With [Cortex](https://cortexmetrics.io/) and [Thanos](https://thanos.io/) the Prometheus-ecosystem knows two well-settled solutions for high-availability of the underlying time series database and with [Amazon Managed Services for Prometheus](https://aws.amazon.com/en/prometheus/) there's also a SaaS-Solution available.

We use Prometheus in nearly every project, it's an essential part of our underlying operations and also well understood by many development teams.
