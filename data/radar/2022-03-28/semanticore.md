---
title: "Semanticore"
ring: trial
quadrant: tools
tags: [ci/cd, documentation, quality assurance]
---

[Semanticore](https://github.com/AOEpeople/semanticore) is an open source tool fulfilling our needs for managing
changelogs and semantic releases.

Build upon git histories and conventional commits, Semanticore creates and maintains changelogs using Gitlab or GitHub
merge requests, and, once merged, creates appropriate tags and releases. Automating this workflow improves our daily
work a lot, and always gives us a clear view on outstanding changes as well as a proper-maintained changelog.

Check out our Semanticore repository at https://github.com/AOEpeople/semanticore or run it locally for testing purposes:

```
$ cd ~/path/to/my/repository
$ go run github.com/aoepeople/semanticore@v0
```
