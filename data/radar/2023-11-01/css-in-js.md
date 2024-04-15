---
title: "CSS-in-JS"
ring: adopt
quadrant: methods-and-patterns
tags: [coding, frontend]
---

Since the release of React 18, many CSS-in-JS libraries like styled-components, emotion, and stitches have encountered a significant challenge. They generate CSS only at runtime, making them incompatible with streaming and [React Server Components](../methods-and-patterns/react-server-components.html). React developers have addressed this issue in an [article](https://github.com/reactwg/react-18/discussions/110), where they explicitly advise against using CSS-in-JS libraries that generate CSS at runtime.

This has created substantial uncertainty among developers and the communities of these affected libraries. The question arises: Is it possible to refactor these runtime libraries into buildtime libraries? To date, none of the libraries have announced any such plans, and, unfortunately, one of the most popular new libraries, stitches, is [no longer being maintained](https://github.com/stitchesjs/stitches/discussions/1149#discussioncomment-6223090).

Fortunately, there has been a growing number of CSS-in-JS solutions that generate CSS at buildtime. Libraries like [Vanilla Extract](https://vanilla-extract.style/), [panda](https://panda-css.com/), and [Kuma UI](https://www.kuma-ui.com/) maintain an excellent developer experience, overcome performance disadvantages, and are compatible with React 18.

Unfortunately, these libraries are not yet widely adopted, and it's challenging to predict how they will develop in the future. Therefore, at DCX, we continue to use established solutions as long as the new React features are not mandatory.

Moreover, we are gaining experience with these new libraries because we see significant potential in them.
