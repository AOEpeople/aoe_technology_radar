---
title:      "RabbitMQ"
ring:       trial
quadrant:   tools

---
RabbitMQ is an Open Source message broker - implementing the Advanced Message Queuing Protocol (AMQP) protocol. It provides a reliable and scalable way to transport data between loosely coupled applications, using different EAI patterns such as the Publish & Subscriber pattern. AMQP supports direct and fan-out exchanges (broadcasts) as well as topics. Queuing mechanisms allow for robust architectures, mitigating the risks of application downtimes. Typically, a RabbitMQ server can easily buffer millions of messages. RabbitMQ supports JMS in addition to AMQP. It is not intended to use JMS for new systems, but it makes RabbitMQ useful for integrating legacy systems.

There are several alternative solutions to RabbitMQ, e. g. the free Apache ActiveMQ, which is integrated in [Anypoint platform](/tools/anypoint-platform.html). ActiveMQ implements a somewhat simpler routing concept than RabbitMQ, but offers more protocols. Commercial products in this area are offered by IBM (Websphere MQ), Fiorano and almost every vendor of ESB products.

We use RabbitMQ internally for transferring messages safely in our logging ecosystem between [Logstash](/platforms-and-aoe-services/elk-stack.html) proxies and servers using direct and fan-out exchanges for delivering messages to appropriate destinations. RabbitMQ is also used to asynchronously trigger Jenkins jobs from our SCMs to mitigate heavy load on the SCMs, usually caused by Jenkins polls for SCM changes. Additionally, some critical events for monitoring are using RabbitMQ for guaranteed notification. 

RabbitMQ is rated "Trial". It fits into our approach to build robust, [resilient systems](/methods-and-patterns/resilience-thinking.html) and use [asyncronous messages](/methods-and-patterns/decoupling-infrastructure-via-messaging.html) for loosely coupled communications between components. In practice, RabbitMQ proved to be stable and dealt well with service interruptions from failures and maintenance slots. A common pain point is RabbitMQ as a single point of failure disrupting the data flow in a system. This issue is currently approached by setting up a HA cluster for RabbitMQ. The outcome of this approach will clarify the extent of future usage of RabbitMQ in our systems.

 ![](/assets/images/rabbitmq.png)
