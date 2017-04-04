---
title:      "PHP7 over PHP5"
ring:       adopt
quadrant:   languages-and-frameworks

---

PHP 5 has been around for a very long time, and can be considered as the PHP version that defined where PHP wants to go in the future.
With proper OOP, support for clojures and a steadily improving type system, it has become a very mature language.
However, in the past 3 years, Facebook introduced HHVM, which became a major influence on PHP 7 and eventually brought a lot of improvements not only for the execution speed, but also with proper type hints and other features.

Here at AOE, we have numerous PHP projects, and we often kept it backwards-compatible to make sure that it will run on older systems. This is comparable to the procedure most frameworks (Magento, OroPlatform and derived projects) use.

Now, PHP 5 has reached its end--of-life, and it is time to discontinue the backqards-compatibility in favor of better and more stable applications.
Even though we can use the PHP 7 runtime while being PHP 5-compatible, it is not considered good practice anymore, as we can now rely on the PHP 7 features and use all of its advantages.

One of the major points PHP 7 supports is proper typehinting and return types (apart from PhpDocs), which makes [static analysis](/tools/phan.html) much easier and can improve the overall code quality significantly.
