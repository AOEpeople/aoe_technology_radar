---
title: "Jest "
ring: assess
quadrant: tools
tags: [frontend, quality assurance]
---

[Jest](https://facebook.github.io/jest/) is a JavaScript testing framework by facebook to test JavaScript code **and** React applications / components.

We started using Jest (and [watchmen](https://github.com/facebook/watchman)) instead of Karma because it:

- gives us integrated mocking library
- gives us integrated support for testing "promises"
- gives us integrated code coverage report
- automatically runs tests related to changed files (instead of all tests)
- gives us parallel test execution
- gives us snapshot testing for React components

It is easy to set up.
And even if you have a running setup with Karma/Chai you can easily replace Karma with Jest.
With a small [workaround](https://medium.com/@RubenOostinga/combining-chai-and-jest-matchers-d12d1ffd0303#.3callo273), Chai and Jest test matchers work fine together.
