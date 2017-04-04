---
title:      "Keycloak"
ring:       trial
quadrant:   tools

---
User management, authentication, authorization and Single Sign-On are part of most distributed systems nowadays. Building these sensitive and serious parts on your own might be a problem due to knowledge- and budget restrictions. Because of growing requirements in that field (social logins, single sign-on, federation, two-factor authentication, etc.), as well as growing security concerns, building these things on your own has become more challenging during the past decade.

As a consequence, the recommendation is: use an existing solution and connect it with your project's codebase using provided standards. Our recommended solution is the Open Source project JBoss Keycloak. We use Keycloak in our OM3 suite for several authentication-related use cases - such as user management for system users and single sign-on for customers. The OAuth access tokens can be used to secure APIs that access sensitive information.

Keyloak is based on standards such as OAuth2, OIDC and SAML2. Securing a distributed system is supported by adapters, which are provided by the Keycloak developers for different technology stacks. If there is no adapter for your technology stack, an integration on protocol level with a library is simple. A lot of configurable features require no coding in the integrated projects.

By design, the Keycloak project offers customizability and extensibility via so-called SPIs, e.g. a custom authenticator can be implemented to address project specific problems.

Keycloak normally runs standalone and can use various database products. A docker image is available to start in a containerized environment.

Keycloak might be overkill, depending on your project needs. For a simple integration with, for instance, a social login provider (Facebock, Twitter, etc.) Keycloak might be too much. For a JVM project, the pac4j library might be an alternative. If a cloud-based solution is preferred and data privacy concerns are not an issue, Auth0 might be the choice.
