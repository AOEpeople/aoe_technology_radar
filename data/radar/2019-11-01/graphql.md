---
title: "GraphQL"
ring: adopt
quadrant: methods-and-patterns
tags: [architecture]
---

[GraphQL](https://graphql.org/) is a query language for your API, and a server-side runtime for executing queries by
using a type system you define for your data. It isn't tied to any specific database or storage engine and is instead
backed by your existing code and data.

GraphQL was developed by Facebook around 2010 and released 2015.
The main challenge it solves is to improve communication between browser and server on high dynamic web apps.

Key advantages are:

- schema and schema validation together with a useful type system
- the client (browser) controls what data should be sent (data reduction)
- with one request you can fetch "all" required data

Client side integration can be achieved using the [Apollo Client Framework](/tools/apollo-client.html) which easily
integrates into [React.js](/languages-and-frameworks/react.html) based frontends.

The Flamingo framework [offers support for GraphQL](https://docs.flamingo.me/3.%20Flamingo%20Modules/graphql.html)
while Flamingo Commerce provides a full-featured GraphQL API for e-commerce:
[Example GraphQL Console for Commerce](https://demoshop.flamingo.me/en/graphql-console).
