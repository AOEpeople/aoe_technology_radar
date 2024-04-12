---
title: "Amazon EKS"
ring: adopt
quadrant: platforms-and-operations
tags: [devops]
---

[Amazon Elastic Kubernetes Service](https://aws.amazon.com/de/eks/) (Amazon EKS) is a managed service that makes it easy for you to run Kubernetes on AWS without needing to stand up or maintain your own Kubernetes control plane or workloads.
Amazon EKS runs Kubernetes control plane instances across multiple Availability Zones to ensure high availability.
It also provides automated version upgrades and patching for them.

Amazon EKS is fully supported by [Terraform](https://www.aoe.com/techradar/platforms-and-operations/terraform.html) which brings the advantage that its configuration is written in code,
which fulfils the [infrastructure as code](https://www.aoe.com/techradar/platforms-and-operations/infrastructure-as-code.html) philosophy.
Amazon has also implemented important (security) features to their service to ensure that Amazon EKS is well integrated into the broader AWS landscape.
Kubernetes version upgrades and security patches are provided in a reliable schedule and with proper documentation.
Alongside with the managed service, Amazons also provides its own [EKS distribution](https://aws.amazon.com/de/blogs/opensource/introducing-amazon-eks-distro/) which closes the gap for on-premise installations.

Different Amazon EKS Clusters are in use on a variety of environments like development, integration, testing and production.
We experienced that Kubernetes version updates are done without major efforts or impact to the running cluster. Along with that, using EKS avoids a lot of low-level optimization and component management which were required in manually configured clusters in the past.
