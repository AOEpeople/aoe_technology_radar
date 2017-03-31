---
title:      "ELK Stack"
ring:       adopt
quadrant:   platforms-and-aoe-services

---

The company behind Elasticsearch offers a very nice solution for logging and analysis of distributed data such as logfiles.

In today's increasingly distributed IT systems, it's very helpful to have a central view of what is going on in your systems - and of course nobody can and wants to look in different logfiles on different servers. A central logging solution provides the option to detect potential relationships between different events more easily. Also, also it can be used to extract useful KPIs or to visualize information on dashboards.

The abbreviation "[ELK](https://www.elastic.co/products) Stack" stands for the Tools <u>E</u>lasticsearch, <u>L</u>ogstash and <u>K</u>ibana: Together, they provide a solution for collecting data the ability to search, visualize and analyze data in real time.

Logstash is used to process and forward different data (or logfile) formats. <u>E</u>lasticsearch is used as a search index and together with the Kibana plugin you can configure highly individual dashboards. Recently, there are also the Beats Tools joining this toolstack to ship data to Elasticsearch.

We have been using the ELK Stack for several years now in several projects and different infrastructure setups - we use it to visualize traffic, certain KPIs  or just to analyze and search in application logs. We encourage all teams to use such a solution and take care to write useful logs in your applications.
