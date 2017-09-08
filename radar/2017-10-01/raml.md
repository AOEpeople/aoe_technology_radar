---
title:      "RAML"
ring:       adopt
quadrant:   tools

---

[RAML](http://raml.org/) (the RESTful API Modelling Language) is a YAML-based API specification language. It's now available in [version 1.0](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#defining-types). The philosophy behind it is to [specify the API before implementation](/methods-and-patterns/api-first-design-approach.html).

If you follow this philosophy, you can design your API and discuss it with your clients and team before implementing a single line of code. API consumers are able to implement against the API before it's really up and running. The [api-console](https://github.com/mulesoft/api-console) provides a beautiful online documentation with "try it" features for your raml definition.

The RAML ecosystem provides a rich toolset for code generation (e.g. [online editor](http://rawgit.com/mulesoft/api-designer/master/dist/index.html#/?xDisableProxy=true);[ api-workbench](http://apiworkbench.com/)), automatically generated documentation, code generation (e.g. [go-raml](https://github.com/Jumpscale/go-raml)), mocking, testing and much more. We prefer RAML over Swagger because of this.
