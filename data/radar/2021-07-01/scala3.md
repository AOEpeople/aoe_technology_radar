---
title: "Scala 3"
ring: "trial"
quadrant: "languages-and-frameworks"
featured: true
---

[Scala 3](https://docs.scala-lang.org/scala3/) is the successor of the Scala 2.x series programming language.

It's not just a small iteration on Scala 2 but a complete overhaul of the language trying to improve in several areas like:

- Syntax
  - "quiet" syntax for control structures like `if`, `while` and `for`
  - optional `new` operator
  - Optional braces with significant-indentation syntax like in python
  - Completely revised `implicit`s - see below
- Contextual Abstractions focusing on intent instead of mechanics
  - Abstracting over contextual information with `using`
  - Providing type-class instances via `given`
  - direct extension method syntax `extension (s: String) def pirate: String = s"$s arr!"`
- Type System improvements
  - `enum`s
  - opaque types
  - intersection and union types
  - dependent function types
  - polymorphic function types
  - type lambdas
  - match types
- Improvements for object oriented design
- Completely new metaprogramming facilities while Scala 2 macros were removed

Even with these big changes Scala 3 provides a great compatibility story supporting Scala >2.13.5 libraries in Scala 3 projects and vice versa.

Although slowly we will update our existing Scala 2 codebase to Scala 3 over the next months and years to take advantage of the improvements made.
