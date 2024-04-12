---
title: "Software Bill of Materials (SBOM)"
ring: assess
quadrant: platforms-and-operations
tags: [devops, security]
---

A Software Bill of Materials (SBOM) is an artifact that consolidates information about the dependencies of a software.

Several standards exist that define the contents and format of SBOMs. The most prominent open-source formats include:

- [CycloneDX](https://cyclonedx.org/) (OWASP): designed in 2017 with the goal of identifying vulnerabilities in the software supply chain.
- [SPDX](https://spdx.dev/) (Linux Foundation): primarily focused on license compliance in the context of open source software. Support for tracking security vulnerabilities was added in 2016 with SPDX 2.1.

While the goals of these SBOM formats vary, they both support:

- Automated generation of SBOMs from source code.
- Machine-readable output to enable automated processing of SBOMs.

We see the potential for SBOMs to enhance software supply chain security by:

- Providing transparency regarding direct and transitive software dependencies.
- Automating the detection of software dependencies with known vulnerabilities.
- Promoting interoperability of security tools that support the same SBOM standards.
