---
title:      "Wiremock"
ring:       trial
quadrant:   tools

---
**[WireMock](http://wiremock.org/docs/)** is an HTTP mock server - it can be used to mock APIs for testing.

At its core, it is a web server that can be prepared to serve canned responses to particular requests (stubbing), and that captures incoming requests so that they can be checked later (verification). It also has an assortment of other useful features including record/playback of interactions with other APIs, injection of faults and delays, simulation of stateful behavior.

It can be used as a library by any JVM application, or run as a standalone process either on the same host as the system under test or a remote server. All of WireMock's features are accessible via its REST (JSON) interface and its Java API. Additionally, the mock server can be configured via JSON files.

At AOE, we use WireMock as a standalone server to mock APIs that are outside our system context to get a stable environment for testing and rapid feedback. Besides the decoupled test and development advantages, the mocked APIs can also be used in contract-based tests. We also use embedded WireMock in functional tests to stub external services. The explicit test of faults are especially helpful in building and testing the [resilience of your application](/methods-and-patterns/resilience-thinking.html).

Because of the features such as flexible deployment, powerful request matching and record/payback interactions, as well as the fact that the server runs stable in our project environments, we classify WireMock as *trial*.