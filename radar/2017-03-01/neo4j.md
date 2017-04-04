---
title:      "Neo4j"
ring:       assess
quadrant:   platforms-and-aoe-services

---
Neo4j is one of the oldest Open Source Graph Databases. It's one of the rare NoSQL databases that is fully ACID-compliant. We see two main advantages of graph databases:

* for a lot of domains there is a natural way of modeling this in a graph (the Neo4j website says "everything is a graph"),
* and querying relations between nodes is very efficient in a graph database.

Neo4j database is implemented in Java and can therefore be embedded in your application if you live on the JVM.

You can also choose to run it in a classic server mode, which then provides you with the possibility to either use its REST API or connect to it via the BOLT Driver, which has native bindings for the most popular languages.

The cypher query language which comes with Neo4j is a declarative graph query language that allows for expressive and efficient querying and updating of the graph.

At AOE, we use Neo4j mostly for explorative, interactive work with weakly structured or highly connected data, also we are evaluating this for knowledge-based recommendations in our [Searchperience](http://www.searchperience.de/home.html) product.
