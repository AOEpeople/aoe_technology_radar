---
title:      "Terraform"
ring:       adopt
quadrant:   platforms-and-aoe-services

---
[Terraform](https://www.terraform.io/) is a tool for building, changing and versioning infrastructure using the infrastructure as code pattern.
Terraform supports popular service providers like AWS, Google Cloud Platform, Azure and many more.

Infrastructure is described in configuration files trough the HCL (HashiCorp Configuration Language), which brings a set of string interpolations and built-in functions, 
including conditionals and loops. Terraform validates configuration files before trying to run updates. It checks not only that all files use the correct syntax, 
but also that all parameters are accessible and the configuration as a whole is valid. In Terraform, you can (and should) run a ‘plan’ step before applying any changes. 
This step tells you precisely what is going to change and why.
Another feature of Terraform is that it makes it easy to reuse code by using modules. That gives a lot of leeway in structuring projects in the way it makes most sense.

Here at AOE we use terraform in multiple teams to provision infrastructure and manage their lifecycle on cloud platforms such as AWS and for platforms such as Kubernetes.
