---
title: "Diagrams as Code"
ring: adopt
quadrant: methods-and-patterns
tags: [architecture, quality assurance, documentation]
---

Documenting concepts and software architecture as diagrams using code offers significant benefits over heavier solutions. Treating documentation and diagrams as code and checking them into version control increases transparency, collaboration, and productivity. The textual representation of diagrams is easy to write and read, and generating graphical representations as SVG or PNG images is also straightforward with the associated tools.

We extensively use [PlantUML](/tools/plant-uml.html) in combination with [Asciidoc](/tools/asciidoc.html) and tools like [AsciiDoctor Diagram](https://asciidoctor.org/docs/asciidoctor-diagram/) to include and inline PlantUML diagrams in our documentation. The latter allows for a variety of other diagram formats, which can be easily mixed and matched.

Other tools worth mentioning include:

- [Mermaid](https://mermaid.js.org/), a JavaScript-based diagramming tool natively supported by many common tools (e.g., GitHub, GitLab, Gitea, Notion, etc.).
- [D2](https://d2lang.com/), a diagram scripting language that focuses on readability and provides a CLI and a Go library for programmatically creating diagrams.
- [Structurizr](https://structurizr.com/), which brings its own DSL for creating software architecture models based on the [C4 model](https://c4model.com/) and a CLI for exporting to formats like PlantUML, Mermaid, D2, and others.
