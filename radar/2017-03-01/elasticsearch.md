---
title:      "Elasticsearch"
ring:       trial
quadrant:   platforms-and-aoe-services

---
Elasticsearch is a REST-based search and analytics engine based on Lucene. Unlike its competitor Apache Solr, it was developed in the beginning with clustering and scaling in mind. It allows you to create complex queries while still delivering results very fast.

At AOE, we use Elasticsearch for logging as well as our own search solution [Searchperience®](http://www.searchperience.com/). We recently moved the Searchperience stack from Solr to Elasticsearch and think this was the right decision. Especially in terms of scaling, ease of use and performance, Elasticsearch really shines. Also, the API design took some of the learnings from Apache SOLR into account - for example, the queryDSL is a powerful way of describing different search use cases with highly flexible support of aggregations, etc.