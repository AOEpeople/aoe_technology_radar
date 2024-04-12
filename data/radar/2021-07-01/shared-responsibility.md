---
title: "Shared Responsibility Model"
ring: trial
quadrant: methods-and-patterns
tags: [devops]
---

Since introducing "Platform Engineering Team" who build, maintain and operate our Kubernetes clusters and other related platform services, the question occurs who is in charge of the various tasks like keeping things up and running, applying critical security fixes, update software in general, keeping an eye on the bill and many more topics.
We're not proposing a solution on how to split responsibilities here, but we want to raise awareness for bringing everybody together and formally discuss all responsibilities and write them down similar to (and possibly extending) AWS's [shared responsibility model](https://aws.amazon.com/compliance/shared-responsibility-model/).
Some topics are 24/7 on-call support, broken deployment pipelines, and vulnerability scans.
