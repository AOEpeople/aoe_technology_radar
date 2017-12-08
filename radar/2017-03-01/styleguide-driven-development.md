---
title:      "Styleguide Driven Development"
ring:       trial
quadrant:   methods-and-patterns

---
The goal of Styleguide Driven Development is to develop your application user Interface independently and reusable in a Pattern Library.\
In the old days, the frontend was developed based on page-centric Photoshop files which made it hard to change things afterwards. With styleguide driven development you build smaller elements, which are reusable in all of your frontends.

You can start developing your UI components (HTML/CSS/JavaScript) very early in the production phase without having to wait for a ready-to-use development system.\
Designers and Testers can give feedback early and you can share the documentation and code with external teams.

At AOE, we use [Hologram](https://trulia.github.io/hologram/) to build a living documentation right from the source files. Whenever a new UI Element is needed, a developer starts building it in the styleguide -- not in the actual application code. By writing the code for the new component, the documentation for it is created instantly. Any other developer can easily see which elements exist and how it can be used in the code.
