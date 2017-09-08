---
title:      "Explicit test strategy"
ring:       assess
quadrant:   methods-and-patterns

---
According to the [ISTQB Glossar](http://glossar.german-testing-board.info/#teststrategie)- a **Test Strategy** is an abstract specification that comprises the designated test levels (unit, integration, system and acceptance tests) and the implementation of each level for a whole organization or for an application. This test strategy can be applicable to one or more projects.

At AOE, we established an explicit test strategy for many of our projects. The coordination of the test levels improves the effectivity of test runs and helps to avoid testing gaps, double inspection and overhead. Every test level has a different focus. Tests that are executed on one level don't have to be implemented on others.

These are the test levels that we implement as a standard in the software deployment pipeline of our projects and that handle multiple integrated components and services:

-   **Unit Test:** The unit level tests verify the functionality of a specific section of code, usually at the function level. We use static as well as dynamic test methods such as code reviews, style or complexity checks and white-box testing. 
-   **Module Tests:** Module Tests focus on testing the functionality that a service or component provides in isolation to other components or services that this service depends on. This test stage finds errors in a component. It should never fail due to a consumed service that is not reachable or has been altered. Therefore, all dependencies of these components are mocked or stubbed on some level. Tests are most commonly conducted through interfaces using black-box testing.
-   **Integration Tests:** On the integration level, individual software modules are combined and tested as a group. The integration testing verifies functional, performance and reliability requirements. These tests are also most commonly conducted through interfaces using black-box testing. In case there is a great number of (external) subsystems, we mock these systems outside of the defined context and use contract-based testing to verify the interfaces. All contract-based tests that focus on testing the interface contracts between services are also executed on this test level.
-   **System Level Tests:** On the system level, tests are performed on a complete, integrated system, where they evaluate the system's compliance with its specified requirements. System tests not only verify the design, but they also check the system's behavior in general and even the assumed expectations of the customer. They are intended to test up to and beyond the bounds defined by the explicit system requirements.
-   **Client Acceptance Tests:** The client acceptance level includes all testing done by the customer and is the last one in the succession of the five test levels. The objective is to evaluate the system's compliance with the business requirements and to assess whether it is acceptable for delivery.

As a rule, we automate the execution of tests where it is feasible and sensible. Related to the test strategy are the test concept, test data management and the usage of a test case management tool that allows one to assess and categorize functional test cases.

Due to the practical usefulness of having a sound test strategy for a project, we classify the explicit test strategy for projects with assess.
