---
title:      "Evil User Stories"
ring:       assess
quadrant:   methods-and-patterns

---
With Evil User Stories, we aim to raise the project teams' (PO, Dev-Team, QA) and clients' awareness for security topics and introduce a security-by-design principle.

The first step is to identify business use cases of potential vulnerabilities in our software product. The next step is to write an Evil User Story for this use case, from the perspective of an evil persona, e.g. "John Badboy who wants to hack our software". The idea behind this is to take a look at specific parts (business logic) of the software from a perspective that would otherwise not be considered when working on standard user stories.

So how would this work? To illustrate this, let's consider the following user story: "As Emma Shopping I am be able to pay for a product in my checkout using a credit card". To get that story done, we might have to persist some payment data somewhere. But within the context of an Evil user story we now also need to consider the security for the credit card and payment handling in our application. So, for that reason, we write an Evil User Story, which in this case could, for example, be "As John Badboy, I want to steal payment data" or more specifically "As John Badboy, I want to do to sql inject to get the payment token".

Before implementation of this particular user story starts, developers should think about how they can secure potentially vulnerable parts of the software to prevent attacks such as sql injections. In this case, one approach should be the use of prepared statements for sql queries. When the development is finished, we should then be able to test the story using an automated testing approach with a penetration testing tool such as [sqlmap](http://sqlmap.org/) to confirm that our database queries are not vulnerable to sql injections.

Additionally, both solutions should be checked during the development process using code reviews to identify and correct potentially buggy code.
