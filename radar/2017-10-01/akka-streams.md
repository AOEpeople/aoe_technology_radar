---
title:      "Akka Streams"
ring:       assess
quadrant:   languages-and-frameworks

---

In our backend services, we frequently encounter the task to transform data
coming from and uploading to external sources and services.

Building more complex data transformation processes with Akka Actors has proven
very difficult for us in the past.

Seeing this data as a stream of elements could allow handling them piece by
piece and only keeping as much of the data in-process as can currently be
handled.

[Akka Streams](http://doc.akka.io/docs/akka/current/scala/stream/index.html) is
a [Reactive Streams](http://www.reactive-streams.org/) implementation that
provides a very end-user friendly API for setting up streams for data
processing that are bounded in resource usage and efficient.  It uses the Akka
Actor Framework to execute these streams in an asynchronous and parallel
fashion exploiting today's multi-core architectures without having the user to
interact with Actors directly. It handles things such as message resending in
failure cases and preventing message overflow. It is also interoperable with
other Reactive Streams implementations.

Our first trials with Akka Streams were promising but we haven't yet implemented
complex services with it.

We will continue looking into it together with the
[Alpakka](/languages-and-frameworks/alpakka.html) Connectors for integration
work.
