---
title: "Dependency Update Scan"
ring: adopt
quadrant: methods-and-patterns
---

Tools for automated dependency updates continue to offer a big productivity gain when integrated well into the build workflow.

Nonetheless, this comes not without a word of warning.
While it's great in theory, constant updates might quickly lead to a bombardment of merge requests.
It is crucial that the chosen tools work reliably and are really well integrated. Otherwise, this might become overwhelming for teams.
As an alternative, we also had good experience with disabling automatic merge requests and just manually triggering a job when we wanted to take care of the updates.
