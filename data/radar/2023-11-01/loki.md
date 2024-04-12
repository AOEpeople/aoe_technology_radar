---
title: "Loki"
ring: adopt
quadrant: platforms-and-operations
tags: [devops]
---

After having very positive experiences, we decided to replace our ELK stacks with Loki, primarily for the following reasons:

- Loki is significantly more cost-effective than the storage requirements of Elasticsearch used in the ELK stack.
- The PromQL-like query language, familiar to users of Prometheus, makes it easier for DevOps and SRE teams who already use Prometheus for monitoring to work with logs.
- Loki's native integration with Kubernetes simplifies the setup and configuration process.
- Loki typically requires less maintenance and overhead compared to ELK.
