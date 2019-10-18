---
title:      "Terraform"
ring:       trial
quadrant:   tools

---

For the infrastructure of our OM3 projects we run multiple Kubernetes clusters, and to orchestrate the infrastructure provisioning we quickly decided to go with Terraform.
Terraform allows us to easily manage our infrastructure, from AWS EC2 instances to RabbitMQ message queues.
Also, the Kops installer for Kubernetes on AWS uses Terraform as its main building brick, and we can trigger Kops via Terraform.

We bring terraform together with [Helm](/tools/helm.html) to manage similar parts of the infrastructure, for example a shared file with domainname to application mappings allows us to provision Route 53 DNS entries via Terraform and then roll out Kubernetes Ingress definitions with the appropriate hostname to service mapping via Helm.
