---
title: "Argo CD"
ring: trial
quadrant: tools
tags: [ci/cd]
---

We've been managing the state of application deployments in YAML files via Git repositories in the past. But we still
wouldn't call this GitOps. A lot of custom glue code and tools were involved.
While [helmfile](https://github.com/roboll/helmfile) replaces some of our custom tooling in a nice way we've also been
trying a new approach with [Argo CD](https://argoproj.github.io/cd/).

Argo CD watches Git repositories continuously and makes sure the state defined there is applied to the Kubernetes
cluster. It introduces a couple of CRDs including one representing a Helm deployment. Using
an "[app of apps](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/#app-of-apps-pattern)"
pattern you can bundle multiple apps together and use existing Git workflows (branching, tagging, PR) to manage releases
to your various stages.

Also, the fact the Argo CD only needs read-only access to the Git repositories makes it a lot cleaner from a security
point of view since no credentials to any clusters need to be buried in any CI/CD pipelines anymore.

Additionally, Argo CD comes with a nice web frontend that gives a lot of insight into what has been deployed and where
problems might exist. For many developers this view on the cluster (with focus on their apps) might be the first go-to
for checking their apps and troubleshooting issues making other tools like Lens or access via kubectl obsolete.
