---
title:      "Keycloak"
ring:       adopt
quadrant:   tools
---
Most distributed systems still face a growing demand for user management, authentication, authorization and Single Sign-On. within light of a growing security demand and specialization, the Open Source project JBoss Keycloak is a perfect match. 

Keyloak is a growing project ever since and has a strong community. Keyloak is based on standards such as OAuth2, OIDC and SAML2. Securing a distributed system is supported by adapters, which are provided by Keycloak developers for different technology stacks. If there is no adapter for your technology stack, an integration on the protocol level with a library is simple. Many configurable features require no coding in the integrated projects. The required configuration is managed via code and promoted as usual. 

We use Keycloak in our OM3 suite for several authentication-related use cases – such as user management for system users and single sign-on for customers. The OAuth access tokens can be used to secure APIs that access sensitive information. In addition, Keycloak is part of the AOE infrastructure and helps securing the various services to support employees and customers.