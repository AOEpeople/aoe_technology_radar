---
title: "API-First Design Approach"
ring: adopt
quadrant: methods-and-patterns
tags: [architecture]
---

The API of any software we develop shapes in which way developers, teams, customers and users interact with our
software.

No matter if a Frontend-API like GraphQL, a rpc-API like gRPC or an internal API published by a module in a larger
project or shared library, messing the API up always creates headaches and is hard to correct.
If we stick to semantic versioning, it's actually pretty impossible to change a once-published API without breaking
consumers.

By today's standards we prioritize API design before actual development, to be clear on how our software interacts, and
thus move this pattern to "adopt".
