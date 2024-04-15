---
title: "OCI Container"
ring: adopt
quadrant: platforms-and-operations
tags: [devops]
---

OCI-compatible containers are currently the most-used solution for creating and managing container-based infrastructures and deployments.

Containers and their runtime are an easy way to run applications and services as an isolated process (using Linux kernel cgroups, network namespaces and custom mounts).

In a DevOps environment, this helps a lot as we can run the exact same software and runtime (such as NodeJS) on both production and locally while developing. This enables us to debug our software much easier. We can compose our project development setup out of small containers. Also, containers allow us to keep our development environment much simpler and independent of our developer's operating system or pre-installed software versions.

In a CI environment building the containers allows us to package and test the whole environment instead of different software components on different runtimes in a much more stable way.

Backed by services such as [Kubernetes](/platforms-and-operations/kubernetes.html) and [Helm](/platforms-and-operations/helm.html), we can deploy containers on a flexible infrastructure and enable our developers to test their software more easily in different environments.

Here at DCX, we use containers in different projects to become more flexible and faster, which increases our focus on development of even better and more stable software.
