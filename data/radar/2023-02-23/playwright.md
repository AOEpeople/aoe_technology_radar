---
title: "Playwright"
ring: trial
quadrant: "languages-and-frameworks"
tags: [coding, frontend, quality assurance]
---

[Playwright](https://playwright.dev) is a cross browser/platform/language tool to write reliable end-to-end tests. It's
easy to get started with and offers a broad variety of functionalities out of the box. Playwright supports Windows,
macOS and Linux and works with the most popular testing frameworks such as Jest, Mocha and Jasmine.
The playwright configuration offers plenty of helpful options, for instance native mobile emulation of Chrome for
Android and Safari for iOS. If needed playwright can be extended by BDD tools like Cucumber or SpecFlow to enable
non-technical contributors to collaborate.

Playwright test are resilient. It waits for elements before performing any actions which eliminates the need for
timeouts - the primary cause of flaky tests.

Other than Cypress Playwright can interact with different origins and multiple tabs. Also, you can create scenarios with
different contexts to handle multiple users within one test. Contexts allow saving an authentication state to reuse it
in other tests. By isolating tests within a separate browser context for each test, the tests are fully independent,
although reusing an authentication state. This prevents you from performing repetitive log-in operations in each test.

As Playwright is developed and maintained by Microsoft there are some great extensions for Visual Studio Code to
develop, run and debug tests.
