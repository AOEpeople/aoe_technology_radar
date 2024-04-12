---
title: "Cypress"
ring: assess
quadrant: tools
tags: [frontend, quality assurance]
---

[Cypress](https://www.cypress.io/) is a front-end testing tool (E2E). It comes as a simple node package and is therefore easy to use and maintain for front-end developers and testers. Cypress has a different approach than Selenium. It runs in the browser and in the same loop as the device under test.

Good:

- [Open source](https://github.com/cypress-io/cypress)
- [Locally installed](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements)
- Straightforward (installed via npm and all tests are written in Javascript)
- Good [documentation](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) and learning material
- Can run in a [headless mode](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)

Not so good:

- No cross browser testing (only Chrome and Electron)
- Scenarios with multiple browser tabs can not be tested
- Relatively new test tool, though it is becoming more popular

Example of a test :

```js
describe("My First Test", function () {
  it("Visits the Kitchen Sink", function () {
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.url().should("include", "/commands/actions");

    cy.get(".action-email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
  });
});
```
