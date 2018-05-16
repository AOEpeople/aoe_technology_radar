---
title:      "GRPC"
ring:       assess
quadrant:   languages-and-frameworks

---

gRPC, "A high-performance, Open Source, universal RPC framework," is a framework to easily connect clients and servers in an RPC setup.
gRPC was initially built at Google, and uses protobuf service definitions for method and payload specification.
Essentially, this makes it possible to define methods that a server exposes, with either a single payload or an incoming stream - either as a single response or a stream of responses.
The definition itself is carried out with the help of protobuf to define message types and method signatures, and then client and server interfaces are compiled for the language(s) you want. Currently there is support for languages such as C++, Java, Python, Go and many more.
The shared language-neutral protobuf definition allows you to create all code for all languages automatically and helps with the interoperability of different systems.

From a technical point of view, gRPC uses HTTP/2 as a transport, directly benefitting from the default TLS encryption.
Besides gRPC, other frameworks also use protobuf RPC definitions. These frameworks include twirp from twitch, which makes it easy to change the transport/control layer with only very small changes to the application code.

We at AOE plan to assess gRPC for microservice architectures which are more RPC style and less REST style.
