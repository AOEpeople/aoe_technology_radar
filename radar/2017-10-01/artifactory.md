---
title:      "Artifactory"
ring:       trial
quadrant:   platforms-and-aoe-services

---
JFrog [Artifactory ](https://www.jfrog.com/open-source/)is a software tool, which, in the end, manages and stores (binary) artifacts.
In addition to storage, it provides a managing interface, which also allows to store build information, properties as well as dependencies per artifact which are organized within repositories. A fine grained security system enables easy management of which artifacts are available to whom.
The artifacts are exposed via an HTTP(S)-Url Artifactory, which can generate package-manager compatible manifests for the repositories. AOE utilizes Artifactory to serve Maven, Apt, Npm, Composer and Docker Repositories.

In addition to storing own assets, Artifactory is able to proxy remote Repository for and cache resolved artifacts locally.
This results in an increased build performance and decouples builds from external service dependencies and ensures builds still work even if they utilize outdated dependencies that might not be publicly available anymore.

Artifactory provides a powerful REST-API for managing Artifacts including a powerful search AQL. It is utilized to provide complex release processes based on QA-Attributes on an artifact level.

Artifactory at AOE currently comes with some problems, too:
* Cleanup in Artifactory has to be done manually. Therefore, if every build is pushed to Artifactory it currently pollutes disk space since old or unused versions are never removed.
* The Composer Integration mirroring github proves to be slower than directly connecting to github.

AOE is using the Professional version for a central instance that can be used by different teams. We encourage teams to use Artifactory instead of Jenkins to store and manage build artifacts - and to take care of cleaning up old artifacts automatically.
