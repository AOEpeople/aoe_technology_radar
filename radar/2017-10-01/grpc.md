---
title:      "GRPC"
ring:       assess
quadrant:   languages-and-frameworks

---

gRPC, "A high performance, open-source universal RPC framework", is a framework to easily connect clients and servers in a RPC setup.
gRPC is initially build at google, and uses protobuf service definitions for method and payload specification.
Essentially this allows to define methods a server exposes, with either a single payload or an incoming stream, and either a single response or a stream of responses.
The definition itself is done with the help of protobuf to define message types and method signatures, and then client and server interfaces are compiled for the language(s) you want. Currently there is support for languages such as C++, Java, Python, Go and many more.
The shared language-neutral protobuf definition allows to automatically create all code for all languages and helps with the interoperability of different systems.

From a technical point of view gRPC uses HTTP/2 as a transport, direcly benefitting from the default TLS encryption.
Beside gRPC there exist other frameworks as well which use protobuf RPC definitions, such as twirp from twitch, which makes it easy to change the transport/control layer with only very small changes to the application code.

We at AOE plan to assess gRPC for microservice architectures which are more RPC style and less REST style.
