---
title: "Vistecture"
ring: assess
quadrant: tools
tags: [documentation, architecture]
---

[Vistecture](https://vistecture.me/) is a tool for the visualization and analysis of distributed
and/or microservice-oriented software architectures of any scale. It can be integrated in a projects
CI pipeline for the automated generation of up-to-date documentation.

With projects at AOE reaching a certain threshold of size and complexity, we started struggling
with keeping documentation up to date manually, especially with regard to e.g. architecture diagrams
or API request/response flows. Thus, we have developed a tool for the rendering of various kinds
of documentation and visualizations based on a single architecture description file.

Applications (microservices) and dependencies are defined using a simple, YAML-based syntax. This
service definition can then be converted to the desired output formats or browsed in the Vistecture
online viewer.
