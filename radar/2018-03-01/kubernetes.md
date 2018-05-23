---
title:      "Kubernetes"
ring:       adopt
quadrant:   platforms-and-aoe-services

---

Kubernetes has developed into the quasi-standard for container orchestration: Nearly every cloud provider provides managed Kubernetes, and even Docker Enterprise uses Kubernetes.
We are running several production systems with Kubernetes and we are using it in concepts such as:
 * "secrets" and "configmaps" to manage configurations for the applications. By updating these resources with an automated configuration pipeline you have a great method for configuration management.
 * Autoscaling of Kubernetes nodes and the usage of "horizontal pod scaling" inside Kubernetes allows elastic scaling
 * The support of managing permissions with OAuth allows you to secure Kubernetes with [Keycloak](/tools/keycloak.html) (SSO)
 * Kubernetes extensibility and API can be used for automation and customization. There is a growing ecosystem around extensions, which adds additional features.
