---
title:      "Protobuf"
ring:       assess
quadrant:   languages-and-frameworks

---

In an increasingly microservice-oriented environment, it is crucial that all parties agree on a common language and wire format for data exchange.

JSON and XML are two well-known formats for serialization of data; however, they come with a few drawbacks. JSON is completely dynamic without any validation (though there is json-schema) and XML uses an extremely heavyweight syntax, which carries a huge overhead, so parsing and transport becomes quite slow.

Protobuf, amongst others, is an approach to solving this problem by using well-defined schemas to create language-specific code, which serializes/marshals and deserializes/unmarshals data. One of the key features is the built-in support for evolving schemas; it is easily possible to incrementally extend the definition while staying backwards-compatible and compose messages consisting of several sub-messages.

If you are looking for a way to have different systems agree on a common protocol on top of a transport layer (such as AMQP or HTTP), Protobuf is definitely worth examining more closely and should be assessed.
