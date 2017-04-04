---
title:      "Gatling"
ring:       trial
quadrant:   tools

---
[Gatling](http://gatling.io/) is a highly capable load testing tool. It is designed for ease of use, maintainability and high performance.

Out of the box, Gatling comes with excellent support of the HTTP protocol that makes it a tool of choice for load testing any HTTP server. As the core engine is actually protocol agnostic, it is perfectly possible to implement support for other protocols. For example, Gatling currently also ships [JMS support](http://gatling.io/docs/current/).

Gatling is built with [Scala Lang](https://extranet.aoe.com/confluence/display/knowledge/Scala+Lang) and [Akka](https://extranet.aoe.com/confluence/display/knowledge/Akka). By making good use of Scala's native language features (such as as the extensive type system), it makes writing tests feel natural and expressive, instead of writing load tests based on a DSL encoded in some special syntax.

This allows us to use all native Scala features to work with, with the focus on the ability to structure your tests as pure code, and actually unit test your load tests.

Besides the very good performance, we definitely like the pure code-based approach. Gatling creates HTML-based reports with nice graphs and metrics about how and what was tested.

We use Gatling as an alternative to Jmeter with success in some of our projects. We encourage teams to try Gatling for future load testing. There is an integrated test recorder similiar to what other test frameworks have to get you started with a basic test case.
