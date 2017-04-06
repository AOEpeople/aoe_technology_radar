---
title:      "Container-based builds"
ring:       assess
quadrant:   methods-and-patterns

---

Running your builds in isolated containers keeps your build servers clean. It allows you to even run them with multiple versions of a framework or programming language. You don't need additional machines like you would for running builds with PHP5 or PHP7 at the same time or running some legacy builds.

Note that you need to think about some kind of caching mechanism for your depenendies to avoid downloading them in every build, which would cause long build times.

At AOE, we are currently starting to use this approach for building services and it is especially useful if your build has special dependencies. Also, it's possible to use GitLab as a build tool or use Docker with the new Jenkinspipeline. For caching we are evaluating minio as a cache server. We noticed that our builds run quite rapidly and reliably with that. Also, the complexity of the builds decreased since we don't need any workarounds, which were caused by having everything installed on one build server.
