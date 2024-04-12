---
title: "Zero Trust"
ring: trial
quadrant: methods-and-patterns
---

Zero Trust is a security model where no trust is assumed within a known network.

With Zero Trust, there are no assumptions made about the level of trust, and everything is considered untrusted by default. Authentication and authorization occur continuously, rather than just once.

Frameworks like Google's BeyondCorp are built upon that pattern.

## Motivation and History

Classical security paradigms traditionally safeguard a particular network perimeter, such as a company intranet.

Once a person is "inside" – for example, by working within the company network or connecting to it through VPN – they are generally deemed trustworthy.

However, with the rise of cloud technologies and microservices, and the fact that people are working from various locations, this security model is insufficient. The network perimeter is constantly evolving and expanding.

This presents challenges for authenticating subjects that previously relied heavily on network segments.

## Principles of Zero Trust

Zero Trust assumes that no user, service, or device is trusted by default, regardless of location or network. It requires continuous verification of identity, strict access controls, and consistent monitoring of network activity.

**Basic Principles:**

- Least Privilege
- Assume Breach
- Strong Identity Verification
- Verify Explicitly

It involves many **areas and aspects**, including:

- Identities and Identity Awareness
- Device and Device Authentication
- Networking and Firewall
- Application Security (Security by Design, Secure Architecture)
- Infrastructure Security
- Secure Data Handling
- Organization and Culture
- Secure Development and Delivery
- Security Monitoring and Automation

## Implementations

In 2009 Google implemented a zero trust architecture referred to as [BeyondCorp](https://cloud.google.com/beyondcorp). It utilizes OAuth and OpenID standards for implementing Authn and Authz, and has influenced the development of modern Zero Trust architectures.

Typical implementations involve using standards and tools for IAM and SSO, such as [Keycloak](/tools/keycloak.html).

## Summary

While network segments and VPN connections may still be relevant in specific areas, AOE is increasingly implementing a Zero Trust approach in all solutions, components, and services.

We are currently adopting best practices for Zero Trust, which align with the BeyondCorp framework and utilize the OAuth and OpenID Connect standards.

## Additional References

- [Keynote: "Zero Trust - The Hard Way", DevOpsCon Berlin 2023](https://www.youtube.com/watch?v=fCENO_Jt3QE)
