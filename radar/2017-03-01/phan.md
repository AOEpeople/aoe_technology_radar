---
title:      "phan"
ring:       assess
quadrant:   tools

---
Phan is a static code analyzer for PHP7, which is very fast, since it uses the PHP 7 AST (abstract syntax tree). Phan basically offers some of the safety that otherwise only compiled type-safe languages have - such as checking function references and return types.

We expect at least the following benefits:

-   Decreased bug density; possible bugs and issues are found early
-   Safer code and higher code quality

We think Phan can be used in the deployment pipeline or as commit hooks for PHP 7-based applications. For a full Feature list check [here](https://github.com/etsy/phan#features).
