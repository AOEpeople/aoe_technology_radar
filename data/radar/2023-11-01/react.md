---
title: "React.js"
ring: adopt
quadrant: languages-and-frameworks
tags: [coding, frontend]
---

React today is the most widely used frontend library within our company, employed in various forms. Whether it's integrated into frameworks like [NextJS](/languages-and-frameworks/next-js.html) and [Remix](/languages-and-frameworks/remix.html) or utilized for client-side-only applications, React plays a significant role in many of our ongoing projects. Over time, a community of experts has emerged within the company.

We firmly believe that React 18, with its range of new features, will further enhance its popularity within our company and the broader community.

### Suspense

While not an entirely new feature, Suspense was initially introduced in a basic version back in 2018. However, it had certain limitations. Its first official use case was code splitting with `React.lazy`, but this feature was only available on the client side, not during server rendering. The primary goal has always been to enhance the loading experience both on the client and server. With React 18, Suspense now enables Streaming server rendering, a new feature that allows React to send the HTML of the loading fallback first and then, after loading completes, send the actual HTML content to the client. The React team continues to work on improving Suspense, particularly to enable data fetching libraries to use it. They are collaborating with authors of some of the most prominent libraries like TanStack Query, SWR, and Apollo.

### Server Components

Server Components represent a new paradigm in React application architecture with the goal of minimizing the amount of JavaScript sent to the client. This approach introduces a new type of component that operates exclusively on the server. It shows great promise, which is why we have given [React Server Components](/methods-and-patterns/react-server-components.html) a dedicated entry on our Tech Radar.

### Concurrency

This is a fundamental update to React's rendering model, primarily occurring under the hood. It introduces the ability to create multiple versions of a user interface concurrently. With concurrent React, rendering can be interrupted, abandoned, and resumed, allowing the application to respond to user interactions immediately, even if it's currently in the middle of rendering.

The React team is collaborating closely with some of the major players in the React ecosystem to stabilize and enhance the library. They are also experimenting with new features, ensuring that React remains as exciting as ever.
