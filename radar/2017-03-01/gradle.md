---
title:      "Gradle"
ring:       adopt
quadrant:   tools

---
Gradle is a build automation tool originating in the Java space, providing declarative dependency management (like Maven) and support for custom functionality (like Ant). It has superb multi-project support and is extremely extensible via third-party plugins and also via self-written extensions and plugins that make it outstanding in its area.

It uses a Groovy-based DSL to declaratively model your problem domain (Build automation) and provides a rich object model with extension points to customize the build logic. Because it is extremely easy to extend this DSL, you can easily provide a declarative interface to your customizations and add-ons.

While providing plugins for building libs, apps and webapps in Java, Groovy and Scala out of the box it is not tied to the JVM as target platform, which is impressively shown by the native build support for C / C++.

At AOE, it is used in various places already: to build [Anypoint](/tools/anypoint-platform.html)- and [Spring Boot-](/languages-and-frameworks/spring-boot.html) based applications; to build Android Apps; to automate the creation of Jenkins Jobs; to create Docker images and Debian packages and also do some deployment scripting with it.
