---
title: "Fluentd"
ring: hold
quadrant: tools
tags: [devops]
---

[Fluentd](https://www.fluentd.org) remains a great tool for collecting logs, transforming them into any required format, and distributing them to various logging backends. However, in recent years, we have often transitioned to [Grafana Loki and Promtail](/platforms-and-operations/loki.html) for several reasons.

We've also learned that extensive upfront log parsing carries a risk of losing logs and requires significant effort. This doesn't fit well with most projects.
