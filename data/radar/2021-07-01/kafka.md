---
title: "Kafka"
quadrant: tools
ring: trial
featured: false
---

"Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications." (See http://kafka.apache.org/)

In comparison with other messaging solutions (such as [RabbitMQ](/tools/rabbitmq.html) - Apacha Kafka persist the messages (instead of routing them to subscribers). It is written in Scala and Java, and follows the idea of a “distributed log” where messages are appended to the end (like in a log) - and that log is persisted to disk. Clients can choose where they begin reading from that log - often Kafka Streams is used for this.

We are using Kafka in data heavy projects - for example in data analytics use cases.
