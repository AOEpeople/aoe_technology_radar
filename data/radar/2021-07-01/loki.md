---
title: "Loki"
ring: trial
quadrant: tools
featured: true
tags: [devops]
---

Archiving indexed log data with a system like Elasticsearch can be expensive and archiving it as simple text files makes it hard to query them.
[Loki](https://grafana.com/oss/loki/) solves this issue by adding a reference database based on Kubernetes labels to each log line similar to Prometheus, but holding the log data inside a simple blob storage like S3.
This allows the user to query the data by pre-defined labels and keeps the costs for indexing low.

Another benefit is the fact that does not have an endpoint for mutating log data which makes the data immutable from a potential compromised system.

We at AOE are using it for longer term log archiving in several Kubernetes clusters.
