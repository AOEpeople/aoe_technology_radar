---
title:      "Maintain third party packages"
ring:       hold
quadrant:   platforms-and-aoe-services

---

Rebuilding and packaging software from "third parties" (e.g. PHP, MySQL, Redis, Nginx, Java,...) implies starting to maintain the packaging for the desired distribution.

Even with tool support and targeted for automation, we found that building those packages is very often unstable. The effort to keep up with the upstream changes (security changes, fixes, etc...) exceeds the benefit in most cases. We prefer to not create our own packages and rather use what's available in the distribution repository.
