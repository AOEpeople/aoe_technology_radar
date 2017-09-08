---
title:      "Kubernetes"
ring:       assess
quadrant:   platforms-and-aoe-services

---

Kubernetes is a container orchestration platform, which supports many different infrastructure providers. It allows you to deploy containers and takes care of running, scaling or self-healing your applications based on configurations you provide. It's based on years of knowledge and experience Google gained by using containers.

At AOE, we started Kubernetes in a test environment on bare metal to experiment with it. It's currently used for running AOE internal apps such as dashboards as well as running builds in containers. We also started to use it for upcoming projects to run and manage several services. There are Tools to automate the setup of kubernetes in AWS like [Cops](https://kubernetes.io/docs/getting-started-guides/kops/). Another helpful tool is [Minikube](https://github.com/kubernetes/minikube), which allows to test and run kubernetes locally.
