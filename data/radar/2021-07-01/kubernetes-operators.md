---
title: "Kubernetes Operators"
ring: trial
quadrant: methods-and-patterns
tags: [devops]
---

The [Kubernetes Operators](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) allow to manage application configuration within Kubernetes through [custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).
The operators are implemented as Kubernetes controllers and all interaction happens through the Kubernetes API.
This allows to manage application deployment and configuration with the same toolset, it also allows to create another abstraction layer to describe the desired application state and let the operator decide how this state should be reached.

Kubernetes Operators are widely available for many community projects.
These can be shared and found on [operatorhub.io](https://operatorhub.io/).
Implementing custom operators is greatly simplified through the [Operators SDK](https://sdk.operatorframework.io/) which is used as base for many [existing implementations](https://github.com/operator-framework/awesome-operators).

We use operators in most projects and prefer them to custom management code.
We encourage teams to try the existing community operators for e.g. observability and operations tasks.
