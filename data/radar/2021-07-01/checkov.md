---
title: "Checkov"
ring: assess
quadrant: platforms-and-operations
tags: [devops, quality assurance]
---

Checkov is a static code analysis tool for infrastructure-as-code.

It scans cloud infrastructure provisioned using

- Terraform
- Terraform plan
- Cloudformation
- Kubernetes

and detects security and compliance misconfigurations.

At DCX we use Checkov in CI/CD processes to get insights into our Terraform-Modules.
