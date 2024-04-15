---
title: "SonarQube"
ring: adopt
quadrant: tools
tags: [ci/cd, quality assurance]
---

To track code quality of our projects and check for security issues (Static Application Security Testing), we recommend
[SonarQube](https://www.sonarqube.org/). At DCX we use it in CI pipelines to scan our code against the quality gate. If possible we
even check each merge request to prevent degrading code quality before adding it to our code basis.
