---
title:      "Settings Injection"
ring:       discover
quadrant:   infrastructure-and-operational-technology

---
While deploying applications to an environment, the application typically needs to be configured for that specific environment. Typical settings include domain names, database credentials and the location of other dependent services such as cache backends, queues or session storages.

These settings should not be shipped with the build package. Instead, it's the environment - this build is being deployed to - that should expose these values to application. A common way to "inject" these values is by making them available as environment variables or dynamically creating configuration files for the application. You can achieve this pattern without special ui-and-devices - but this concept of settings injection also works with ui-and-devices such as [Consul](/ui-and-devices/consul.html), [kubernetes](/platforms-and-partners/kubernetes.html) (with configMaps and secrets) or [YAD](https://github.com/AOEpeople/YAD).

In this manner, the build package can be independent from the environment it's being deployed to - making it easier to follow the "Build once, deploy often" CI/CD principle.
