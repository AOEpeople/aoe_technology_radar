---
title:      "AOE SSO"
ring:       adopt
quadrant:   platforms-and-aoe-services

---
To improve security and user experience we decided to install an organisation wide SSO and use OpenID Connect integrate with existing tools.
We use [Keycloak](/tools/keycloak.html) as the SSO server, which is backed by our LDAP.
This also helps to implement new infrastructure security based on ["BeyondCorp"](/methods-and-patterns/beyondcorp.html).
