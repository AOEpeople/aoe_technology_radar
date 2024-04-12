---
title: "Next.js"
ring: adopt
quadrant: languages-and-frameworks
tags: [coding, frontend]
---

We are convinced that Next.js is one of the go-to frameworks for React, and we're excited about the features that version 13 has brought with it. During the Next.js Conf 2022, the team announced some exciting adaptations in this release, but the most interesting one is the new "app" router. In collaboration with the React team, this new routing architecture brings some of the newest and most promising features of React 18 to life.

When using the app router, every component, by default, becomes a [React Server Component](/methods-and-patterns/react-server-components.html), making it one of the first real integrations of this pattern in a framework. The goal is to build complex interfaces while minimizing the amount of JavaScript shipped to the client. Another exciting feature is Streaming, which allows incremental transfer of parts of the UI to the client as they become ready. For example, immediately showing some fallback UI until an asynchronous action is completed, and then streaming the final UI to the client. With the app router, it's also possible to easily create shared layouts that preserve state during navigation and remain interactive.

The good thing is that this new architecture can coexist alongside the old page router, giving us the flexibility to incrementally adapt to the new features in existing projects.
