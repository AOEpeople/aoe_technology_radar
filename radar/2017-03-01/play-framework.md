---
title:      "Play Framework"
ring:       adopt
quadrant:   languages-and-frameworks

---

The Play Framework is a lightweight (web)application framework for Java and [Scala](/languages-and-frameworks/scala-lang.html) programmers.

A developer can choose from different modules to include necessary functionality such s accessing http resources, databases, and so on. As a consequence, the developer can choose, and is not distracted by or clobbered with irrelevant things. This approach is considered as minimalistic, but it is easy to include necessary functionality.

Regarding the architecture, Play is stateless and built on Akka. As a consequence, Play applications have much lower resource consumption regarding CPU und memory and can scale easily. Play manages concurrency without binding a request to a thread until the response is ready.

With the use of "[Futures](http://docs.scala-lang.org/overviews/core/futures.html)" in your code you can turn synchronous tasks (such as IO or API call to another service) into asynchronous and you can build non-blocking applications. It is recommended to understand the principles Play uses to achieve performance and scalability.

Play can act as backend service delivering JSON, for esample. For building web applications. the [Twirl](https://www.playframework.com/documentation/2.5.x/ScalaTemplates) template engine enables server-side rendering of html pages. These html pages can include css and java script parts of your own choice.
