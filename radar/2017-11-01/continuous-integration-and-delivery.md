---
title:      "Continuous Integrtation and Delivery"
ring:       scale
quadrant:   infrastructure-and-operational-technology

---

## Why? ##

In former times the release cycle for new features in software applications was months.
Planning, Conception, Implementation, Integration, Testing, Deployment were sequential tasks. Most of them were done manually.
Integration tests are time consuming and brittle. Deployment was done by specialists with a lot of knowledge buried in their head.

Continuous Integration(CI) and Continuous Deployment(CD) targets to improve that situation dramatically.

**Continuous Integration** is the practice of testing each change done to your codebase automatically and as early as possible.

**Continuous Deployment** follows the testing that happens during Continuous Integration and pushes changes to a staging or production system. This makes sure a version of your code is accessible at all times.

- Fast feature releases   
  Customers get new features in days and not months.
- Reduce integration problems   
  Integrate new changes immediately and automatically check whether they work
- Catch issues early  
  Issues are fixed immediately
- Highly automated processes that run stable   
  No head knowledge anymore. Reliable, automated processes.
- Reduce risk   
  Small steps instead of BigBang reduces significantly the risk of deployment.
- More features   
  Reliable processes gives you more time to develop new features.

Automation is a cornerstone of a great development workflow. Every task that can be done by a machine should be. Automation gives you the time to focus on new features. 
But the implementation of automated test, integrations and deployments does not come for free.

## Technology choices/solutions ##

We use a lot of different tools reaching from automated testing, automated integration and deployment.
This is only a subset of our toolset.

- Artifactory
- GoCD
- Jenkins
- TFS Build system
- Azure/AWS APIs and scripting

## Our projects ##

This is also only a small representation of teams that have automated processes.

- Foundational services  
  Highly automated processes from unit testing oder integration testing and deployment to Azure. The team put a lot of effort in and improved the stability of feature releases significant.
- iDesk
- Lexware desktop apps  
  Automated build processes, including setup creation, setup installation and basic tests.

## Contact ##

Best contact point is the Release Deployment (RD) team <_HL_PT_RE@haufe-lexware.com>. It provides central services regarding CI/CD for development teams.
