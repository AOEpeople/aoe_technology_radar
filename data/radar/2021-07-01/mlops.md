---
title: "MLOps"
ring: assess
quadrant: methods-and-patterns
tags: [devops]
---

After spending some time diving into the world of data science and machine learning we're realizing our existing DevOps best practices aren't a perfect fit for the specific workflows we're seeing here.
Data science is not only about code but also all about managing large datasets and models.
Data is being analyzed, models are being trained in many iterations and then software needs to be deployed that does the actual prediction/inference.
And this circle (see: CRISP-DM) will repeat over and over again during the development phase and after the first production release.
"**MLOps**" extends the DevOps best practices in order to cover these new scenarios specific to machine learning workflows.

[DVC](https://dvc.org/) helps dealing with large data sets and models by connecting external storage to your Git repositories and [CML](https://cml.dev/) helps integrating the CI/CD into your GitHub or GitLab workflows.
Since we're already using Kubernetes extensively we're exploring [Kubeflow](https://www.kubeflow.org/) for running the full machine learning workflow on Kubernetes clusters.
