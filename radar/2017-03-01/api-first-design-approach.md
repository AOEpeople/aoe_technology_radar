---
title:      "API-First Design Approach"
ring:       trial
quadrant:   methods-and-patterns

---

The API-First Design Approach puts the API design at the beginning of the implementation without any constraints, for example, from the current IT infrastructure or the implementation itself. The idea is to design the API in a way that it serves its purpose best and the consumers are enabled to work efficiently.

There are several advantages to this approach. For example, it can help to avoid reflecting the internal structure of the application or any internal constraints. Furthermore, as one of the most important design aspects is consistency, one can define features such as the behavior of security, URL schemes, and API keys upfront. It also helps speed up parallel implementation. A team that consumes the API can start working directly after the API design because it can easily be mocked.

There are several tools for modelling an API, but here at AOE we mainly use [RAML](/tools/raml.html) as it provides a rich set of tools for generating documentation, mocking and more. For mocking we use [Wiremock](/tools/wiremock.html), for example.

Related to the "API-First" approach is the "Headless" approach where an existing application (with or without existing API) is used as a backend for a separate frontend. We used this with sucess for Magento-based E-Commerce platforms. This allows encapsulating the core features of that application, while integrating it into a larger landscape of components using its API as a unified way to interact between components. Decoupling the core logic from its presentation layer allows picking the best technology stack for the various parts independently.

For further reading see:
* [Understanding API First Design](https://www.programmableweb.com/api-university/understanding-api-first-design)
* [When crafting your API strategy, put design first](http://www.techradar.com/news/software/applications/when-crafting-your-api-strategy-put-design-first-1262043?src=rss&attr=all)
