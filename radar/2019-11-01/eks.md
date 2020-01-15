---
title:      "Amazon EKS"
ring:       trial
quadrant:   platforms-and-aoe-services

---

[Amazon Elastic Kubernetes Service](https://aws.amazon.com/de/eks/) (Amazon EKS) is a managed service that makes it easy for you to run Kubernetes on AWS without needing to stand up or maintain your own Kubernetes control plane. 
Amazon EKS runs Kubernetes control plane instances across multiple Availability Zones to ensure high availability. 
It also provides automated version upgrades and patching for them.

Amazon EKS is used as part of the infrastructure in the Congstar project. 
Different Amazon EKS Clusters are in use on a variety of environments like development, integration, testing and production.
We experienced that Kubernetes version updates are done without major efforts or impact to the running cluster.

Amazon EKS is fully supported by Terraform which brings the advantage that its configuration is written in code,
which fulfils the infrastructure as code philosophy.