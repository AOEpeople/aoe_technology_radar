---
title: "Mob Programming"
ring: assess
quadrant: methods-and-patterns
tags: [agile, coding]
---

While practising pair programming for several years now at DCX, we have started using
[remote mob programming](https://www.remotemobprogramming.org/) extensively when
switching to remote work during the COVID-19 pandemic.

Mob programming brings the driver/navigator pattern to another level by adding a group
of navigators into the game. With the whole development team focussing on a single
topic, a lot of common understanding and shared knowledge are being generated during
each session as everyone is involved in the development process. The result will be
less controversial code reviews (which might even be completely omitted) and the
evolution of a team coding style in favor of individual ways of problem-solving.

In practice, we found the Git-based [mob](https://github.com/remotemobprogramming/mob)
as an easy-to-use tool for remote mob programming. It provides a fast and simple way
for initiating a mob session, handing over changes to the next person and committing
the outcome.
