---
title:      "Decoupling Infrastructure via Messaging"
ring:       trial
quadrant:   methods-and-patterns

---
In [Microservices](/methods-and-patterns/microservices.html) we have already covered the trend that modern architectures are moving away more and more from big monolithic applications to distributed software suites. The result of splitting our software and infrastructure in smaller parts, is the need to communicate with each other. This can be done by direct communication or by message-based asynchronouous communication. While synchronuous communication allows for more plannable "real-time" response times of the overall systems, asynchronouos communication increases the resilience and stability of the system significantly and allows one to use other integration and scaling patterns. However, it often comes with additional complexity.

Most of the IaaS Cloud providers offer messaging services such as AWS SQS which provide the possibility to decouple our infrastructure via Messaging. Also, we use [RabbitMQ](/tools/rabbitmq.html) as a Messaging and Broker solution within our applications. The decision of using messaging and messaging patterns as an integration strategy can be made as part of [strategic design](/methods-and-patterns/strategic-domain-driven-design.html) considerations.
