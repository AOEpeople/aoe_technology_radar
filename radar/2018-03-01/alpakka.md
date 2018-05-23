---
title:      "Alpakka"
ring:       assess
quadrant:   languages-and-frameworks

---

When using [Akka Streams](/languages-and-frameworks/akka-streams.html) to build
reactive data transformation services you usually need to connect to several
different services such as FTP, S3 buckets, AMQP brokers or different databases.

[Alpakka](https://developer.lightbend.com/docs/alpakka/current/) provides
integration building blocks for Akka Streams to access these services in a
reactive fashion and contains transformations for working with XML, CSV or
JSON structured data.

Combined, Akka Streams and Alpakka enable us to build small reactive
integration services with minimal resource consumption and good performance, and
are a good alternative to larger ESB solutions or integration tools.
