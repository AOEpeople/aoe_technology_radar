---
title: "Sigstore"
ring: trial
quadrant: platforms-and-operations
tags: [devops, security]
---

[Sigstore](https://www.sigstore.dev) is a project by The Linux Foundation® aimed at developing a standard for signing and verifying container images.

While its primary benefit is signing and verifying public images, it can also be used for internal images. Its central tool, `cosign`, allows the signing of container artifacts using a private key within a CI pipeline. This approach enables us to track which job built a specific image and identify the associated codebase. Furthermore, it prevents any malicious entity from tampering with an image or building an image from an unknown source outside the CI pipeline.

With support and funding from The Linux Foundation and its relatively low integration effort, we believe this project has the potential to become the standard for signing container images in open-source projects. [Kubernetes has already begun signing their release artifacts](https://github.com/kubernetes/enhancements/issues/3031) with cosign, and we anticipate that other entities will also adopt it. Therefore, in the future, this ecosystem could serve as a reliable means of verifying the authenticity of public images.
