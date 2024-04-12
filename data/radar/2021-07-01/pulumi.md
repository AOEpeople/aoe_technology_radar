---
title: "Pulumi"
ring: assess
quadrant: platforms-and-operations
tags: [devops]
---

[Pulumi](https://www.pulumi.com/) is a tool in the infrastructure-as-code space that is quite similar to [Terraform](https://www.terraform.io/) in that it also provide a declarative way to provision cloud infrastructure and services.

What makes it interesting is that all configuration is done in one of currently 4 supported general-purpose languages/runtimes:

- Javascript/Typescript
- Python
- .NET Core
- Go

This differs from the Terraform approach which is using its own domain specific 'Terraform Configuration Language'.
While Terraform kept this language intentionally small and limited in functionality in order to make it purely declarative sometimes there is the need to abstract over configuration to keep your configs "DRY".
For this there are modules in Terraform but sometimes all you need is a small function to iterate an input.

This is where Pulumi shines by allowing you to use the powers of the chosen programming language to build whatever abstractions you need to get the job done.

We currently test-drive it in small projects to compare it over Terraform.
