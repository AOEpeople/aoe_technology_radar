---
title: "Conventional Commits"
ring: trial
quadrant: methods-and-patterns
tags: [coding, quality assurance, ci/cd]
---

The Conventional Commits specification is a lightweight convention on top of commit messages.
It provides a small set of rules for writing commit messages and therefore creating an explicit commit history.
The convention dovetails with [SemVer](/methods-and-patterns/semver2.html), by describing the features, fixes, and breaking changes made in commit messages.
The specification contains only 16 items that are easy to follow. The predefined structure allows everyone in the team to get a better overview of what the commit messages relates to and what part of the code a change has to do with.
Some benefits of using these specifications include: the ability to automatically generate changelogs, the ability to determine a semantic version bump (based on the types of commits landed) and being able to communicate the nature of changes to teammates and stakeholders.

We use conventional commits in the team with the help of a git template.
The template contains a guide of elements that are required in the specification plus some information about project specific items that should also be part of a commit, such as a ticket number.
