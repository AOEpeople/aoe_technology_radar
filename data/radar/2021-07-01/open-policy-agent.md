---
title: "Open Policy Agent"
ring: assess
quadrant: tools
tags: [security, architecture]
---

[Open Policy Agent](https://www.openpolicyagent.org/) (OPA) is a framework which allows modelling and evaluating policy access services.
The underlying expression language _Rego_ is purpose-built for the policy evaluations and implements the **Policy As Code** pattern.

This allows to decouple policy from the service's code, so you can release, and review policies separately.

The benefits of using OPA and Rego comes from the various available integrations into other cloud-native services and tools.
It can be used with the "Kubernetes Admission Controller", to authorize decisions within a Service Mesh or as part of infrastructure evaluation pipelines.

We use OPA in some of our infrastructure pipelines to ensure that changes don't have undesired impact or within Kubernetes to evaluate the overall conformity of our deployments with the given policies.

We have also evaluated OPA as part of permission management in distributed architectures.
The concept promises to provide value especially for distributed enterprise architectures.
