---
title: "Harbor"
ring: trial
quadrant: platforms-and-operations
tags: [devops]
---

[Harbor](https://goharbor.io) is a CNCF-graduated open-source container registry. We use it to host custom-built
container images from our projects. Key benefits for us are:

- Harbor automatically scans all container images with [Trivy](https://trivy.dev)
- fine-grained access control allows Harbor to be used in a multi-team environment
- its extensive API allows easy adaption to custom needs, like retention policies
- support for image signing with [Cosign](https://github.com/SigStore/cosign)
