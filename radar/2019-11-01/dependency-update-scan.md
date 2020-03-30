---
title:      "Dependency Update Scan"
ring:       assess
quadrant:   methods-and-patterns

---

Automated dependency scans are useful to remove the manual task of regularly checking for version updates.
Our teams are utilizing the Open Source bots [Renovate](https://github.com/renovatebot/renovate) and [Scala Steward](https://github.com/fthomas/scala-steward), both of which are running as a scheduled GitLab job in our internal infrastructure.
The bots are regularly creating merge requests with dependency version updates against our projects.

Having this automated comes with a few advantages:

- Important dependency updates are available very shortly after they have been published (e.g. for security issues)
- Changelogs are referenced in the merge requests, making it easy to review if the update is relevant
- An automatically triggered pipeline is running our test suites, giving us a high confidence that the version update is non-breaking if the pipeline was successful
- Regular small updates are easier to maintain than bulk updates of many libraries at once, reducing the risk of introducing compatibility breaking changes

Automated merge requests allow us to focus on reviewing, testing and prioritization of dependency version updates with considerably less effort.