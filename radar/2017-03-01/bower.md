---
title:      "Bower"
ring:       hold
quadrant:   tools

---

[Bower](https://bower.io/) is a package manager for frontend resources such as JavaScript libraries and CSS frameworks. Compared to [npm](https://www.npmjs.com/), it has a somewhat different approach to loading and resolving the packages, resulting in a smaller and cleaner folder structure.

In small web projects, this approach is good and sufficient, but larger projects will need more dependencies such as task runners or testing frameworks, which are not available through Bower. As most of the frontend libraries are also available through npm, it's not suprising that we ask ourselves why Bower is still needed.

At AOE, we decided to use npm as the only package manager to avoid having multiple tools doing similar things. Developers only need to deal with one solution, which makes the project easier to maintain.
