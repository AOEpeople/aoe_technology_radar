---
title: "Harbor"
ring: trial
quadrant: platforms-and-operations
tags: [devops]
---

We continue to utilize [Harbor](https://goharbor.io) in our projects. Since the last iteration of the DCX Technology Radar, we have discovered both existing and new features that we find useful:

- An official [Terraform provider](https://registry.terraform.io/providers/goharbor/harbor/latest) for provisioning Harbor resources through Infrastructure as Code (IaC).
- The introduction of [Proxy Cache](https://goharbor.io/docs/latest/administration/configure-proxy-cache/) projects, which serve as pull-through caches for public container registries. These can, among other benefits, help reduce external network traffic.
