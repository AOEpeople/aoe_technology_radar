---
title: "CSS-in-JS"
ring: trial
quadrant: methods-and-patterns
tags: [frontend]
---

CSS-in-JS is a method where JavaScript is used to style components. The first libraries which implemented this technique were [Styled-Components](https://styled-components.com/), [Emotion](https://emotion.sh/) & [JSS](https://cssinjs.org/).

### Example:

```js
const Button = styled.button`
  display: inline-block;
  padding: 0.5rem 0;
  background: transparent;
  color: white;
  border: 2px solid white;

  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;

return <Button primary>Click me</Button>;
```

Advantages of CSS-in-JS

- Local scoping instead of global namespace
- No classname to element mapping
- Use the full power of JavaScript to enhance CSS (loops, variables & more)
- Dynamic styling & theming (access to state or props)
- TypeScript support

Disadvantages of CSS-in-JS

- Runtime cost when using dynamic styling
- Slightly different syntax than traditional CSS (object syntax vs template literals)
- Can add an extra layer of complexity

In the meantime CSS-in-JS has evolved even more. There are some libraries which leverages nearly zero-runtime costs such as [Stitches](https://stitches.dev/) or [Vanilla Extract](https://vanilla-extract.style/) while still providing an excellent developer experience with TypeScript.

We at AOE think that CSS-in-JS is the future of writing good, performant and maintainable CSS, therefore we already use different CSS-in-JS solutions throughout multiple applications.
