---
title:      "GraphQL"
ring:       adopt
quadrant:   methods-and-patterns

---

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

GraphQL was developed by Facebook around 2010 and releases 2015. 
The main challenge it solves is to improve communication between browser and server on high dynamic web apps.

The advantages are:
* schema and schema validation together with a useful type system
* the client (browser) controls what data should be send (data reduction)
* whith one request you can fetch "all" required data

We are using it together with [Apollo Client](/tools/apollo-client.html) in our [React.js](/languages-and-frameworks/react.html) based frontend.
This way the React components have their relevant GraphQL snippet, defining what data they request or mutate from the "backend for frontend", directly coupled. 
That makes it transparent what data is available. Apollo takes care of sending an aggregated GraphQL query to the backend.

The framework [Flamingo offers support for GraphQL](https://docs.flamingo.me/3.%20Flamingo%20Modules/graphql.html) and also Flamingo Commerce offers a full featured GraphQL API for e-commerce features. ([Example GraphQL Console for Commerce](https://demoshop.flamingo.me/en/graphql-console))