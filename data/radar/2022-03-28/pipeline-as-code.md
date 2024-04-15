---
title: "Pipeline as Code"
ring: adopt
quadrant: methods-and-patterns
tags: [devops]
---

In the past years many tools have evolved and especially [Gitlab CI](https://docs.gitlab.com/ee/ci/),
[GitHub Actions](https://github.com/features/actions) and [AWS CodeDeploy](https://aws.amazon.com/de/codedeploy/)
matured or became available and widely used across many teams.

Continuous Integration and Delivery is an important part in every project. Pipelines which are maintained as code, can
now be handled like most other parts of your software. The pipeline configuration can run through lint checks, or a test
suite before the configuration is shared across teams in your organisation.

Using [container based builds](https://www.DCX.com/techradar/methods-and-patterns/container-based-builds.html) is now
also the de facto standard. Combining these two techniques enables running isolated builds in an easily reproducible
environment so teams can get quick feedback on every change.
