---
title:      "Pipeline as Code"
ring:       assess
quadrant:   methods-and-patterns

---

Continuous Integration and Delivery is a critical part of our development and deployment process at AOE. Using Jenkins for many years the "instructions" how to build, test and deploy applications were scattered between many custom scripts and the pipeline was often maintained by manual maintenance of Jenkins jobs. Soon, we realized that we need a more native way to express the full CI/CD pipeline process in code and manage it in version control.

Being an important part of each project, the pipeline configuration should be managed as code and rolled out automatically - this also allows us to manage the pipeline itself applying the same standards that apply to application code.

While some teams started using Jenkins' [JobDSL plugin,](https://wiki.jenkins-ci.org/display/JENKINS/Job+DSL+Plugin) others explored the new [Jenkins Pipeline](https://jenkins.io/doc/book/pipeline/) - in both ways, the build artifacts should be published to an artifact repository such as [Artifactory.](/platforms-and-aoe-services/artifactory.html)
