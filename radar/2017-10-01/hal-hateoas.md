---
title:      "HAL / HATEOAS"
ring:       assess
quadrant:   methods-and-patterns

---
Hypermedia As The Engine Of Application State or in short HATEOAS is a pattern that helps to organize dependencies and resources in a RESTful API. The basic idea of HATEOAS is that an API consumer do not have to know how dependencies of resources are connected and how to get them. A consumer must only be familiar with the basics of hypermedia.

Let's assume we have a bank account and an action to deposit money on that account. Everything you need to know is that the account resource has an action for a deposit. The URL of that action can then fetched from the link attribute with the corresponding relation.

```
<account>
    <account_number>12345</account_number>
    <balance currency="usd">-25.00</balance>
    <link rel="deposit" href="https://bank.example.com/account/12345/deposit" />
</account>
```

Besides from HATEOAS there is an alternative implementation called Hypertext Application Language, in short HAL, which has much more features than the basic HATEOAS.

With HAL you are allowed to also define parametrized links, embedded resources and documentation relations (which are called curies). You can find the specification here.
[http://stateless.co/hal_specification.html](http://stateless.co/hal_specification.html)

If you want to link different api endpoints or ressource locations in your API responses you should use this standard.