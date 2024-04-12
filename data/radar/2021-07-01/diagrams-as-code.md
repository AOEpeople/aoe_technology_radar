---
title: "Diagrams as Code"
ring: adopt
quadrant: methods-and-patterns
tags: [architecture, quality assurance, documentation]
---

Documenting concepts and software architecture as diagrams using code offers great benefit over heavier solutions.
Having documentation and diagrams treated as code and checked-in into version control increases transparency, collaboration as well as productivity.
The textual representation of diagrams is easy to write and read. Generation of graphical representations as SVG or PNG images is also easy with the associated tools.

We make heavy use of [PlantUML](/tools/plant-uml.html) combined with [Asciidoc](/tools/asciidoc.html) and tools like [AsciiDoctor Diagram](https://asciidoctor.org/docs/asciidoctor-diagram/) to include and inline PlantUML diagrams into documentations.
The latter allows a variety of other diagram formats which can be easily mixed and matched.
