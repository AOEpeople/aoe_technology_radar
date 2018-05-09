---
title:      "Kubernetes"
ring:       adopt
quadrant:   platforms-and-aoe-services

---

Kubernetes has developed to the quasi standard for container orchestration: Nearly every cloud provider provides managed Kubernetes and even Docker Enterprise uses Kubernetes.
We are running several production systems with Kubernetes and we are using it concepts like:
 * "secrets" and "configmaps" to manage configurations for the applications. By updating this ressources with an automated configuration pipeline you have a great way for configuration management.
 * Autoscaling of Kubernetes nodes and the usage of "horizontal pod scaling" inside Kubernetes allows elastic scaling
 * The support of managing permissions with OAuth allows to secure Kubernetes with [Keycloak](/tools/keycloak.html) (SSO)
 * Kubernetes extensibility and API can be used to automate and customize it to your needs
