---
title: "React Server Components"
ring: assess
quadrant: methods-and-patterns
tags: [frontend, coding]
---

Shortly after releasing React 17 in October 2020, the team introduced React Server Components (RSC) as a working draft in December 2020. RSCs represent a new application architecture paradigm within React designed to reduce the amount of JavaScript sent to the client. The ultimate goal is to enhance performance, user experience, and maintainability.

This new feature enables the creation of components that exclusively run on the server. As a result, there is no impact on the bundle size downloaded by the client. For instance, libraries used in server components are not shipped to the client. RSCs also have the capability to access server-side resources, such as databases and the file system, directly.

In addition to server components, there are client components, which are essentially the classic components everyone is familiar with. The only distinction is that client components need to be explicitly declared using a directive. Determining which components should be client or server can be one of the more challenging aspects, especially when the goal is to migrate existing applications.

RSCs appear to be most effective when used with Server Side Rendering, although it is possible to use them without it. RSCs and Server Side Rendering complement each other well, as server components are only rendered once on the server and do not need to be sent to the client. Client components are still rendered on the server and then hydrated on the client side. However, with a well-structured application that minimizes client-side code and in combination with React 18's [Suspense and Selective Hydration](https://github.com/reactwg/react-18/discussions/37) features, a performance boost is expected. To test this hypothesis, the React team has collaborated with Vercel, the maintainer of [NextJS](/languages-and-frameworks/next-js.html), to integrate RSCs into a suitable environment early.

Overall, we recognize the potential of this new approach, even though there are several steps to take, particularly for meta-frameworks to achieve production readiness. It appears to be only a matter of time before adoption of React Server Components becomes widespread. This is why we have placed it in the assess ring, keeping a watchful eye on this evolving technology.
