---
title:      "Alpakka"
ring:       assess
quadrant:   languages-and-frameworks

---

When using [Akka Streams](/languages-and-frameworks/akka-streams.html) to build
reactive data transformation services you usually need to connect to several
different services like FTP, S3 buckets, AMQP brokers or different databases.

[Alpakka](https://developer.lightbend.com/docs/alpakka/current/) provides
integration building blocks for Akka Streams to access these services in a
reactive fashion and also contains transformations for working with XML, CSV or
JSON structured data.

Akka Streams and Alpakka combined enables us to build small reactive
integration services with minimal resource consumption and good performance and
are good alternative to bigger ESB solutions or integration tools.
