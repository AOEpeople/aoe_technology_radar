---
title:      "Jest "
ring:       assess
quadrant:   tools

---
[Jest](https://facebook.github.io/jest/) is a javascript testing framework by facebook to test javascript code **and** react applications / components.

We started using Jest (and [watchmen](https://github.com/facebook/watchman)) instead of Karma because it:

-   gives us integrated mocking library
-   gives us integrated support for testing "promises"
-   gives us integrated code coverage report
-   automatically runs tests related to changed files (instead of all tests)
-   gives us parallel test execution
-   gives us snapshot testing for react components

It is easy to set up. And even if you have a running setup with karma/chai you can easily replace karma with jest. With a small [workaround](https://medium.com/@RubenOostinga/combining-chai-and-jest-matchers-d12d1ffd0303#.3callo273), chai and jest test matchers work fine together.