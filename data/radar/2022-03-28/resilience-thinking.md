---
title: "Resilience Thinking"
ring: adopt
quadrant: methods-and-patterns
tags: [architecture]
---

Resilience is the capability of an application or service to resist different error scenarios. Especially for
distributed systems - where a lot of communication between different services happen - it's very important to explicitly
think of implementing resilience.

There are a lot of different resilience patterns, and it is also a matter of the overall software design. Typical
patterns and methods used are:

- Do not hide API calls or any other external communication in your application (for example with unnecessary
  abstraction) - instead make it explicit that an external communication happens - e.g. by using the Facade Pattern. On
  the one hand, this makes it obvious that a potential slow and error-prone communication is going to happen, and it
  makes it easier to implement error handling.
- Detect errors explicitly: Check the response message format and configure proper timeouts for external communication
- Handle errors in a smart way: Show a nice error message to your customer or, even better, graceful degrade features -
  e.g. by showing some fallback text
- Use message-based communication where useful ([Decoupling Infrastructure via Messaging](/methods-and-patterns/decoupling-infrastructure-via-messaging.html))
- Use circuit breakers to isolate errors and allow systems to recover
- Use short activation paths in your strategic architecture - so that there is only a minimal set of communications
  between your services required for certain features or business requests

"Embrace Errors" should be the mindset - because it is not a question if errors appear - it's just a question of when.
