---
title:      "CRC Games"
ring:       assess
quadrant:   methods-and-patterns

---

Class Responsibility Collaboration Card Games are a method to discuss and align the software design - especially useful for object-oriented software.

A proper software design is one of the most important things to ensure the sucess and the maintainability of your software.
Especially for iterative development methods, where you work on a software task by task, it is important to have designs sessions that also look forward to the next iterations and the conceptional whole.

And for software design to be sucessfull, it is very important that everybody (in the team) has the same understanding of the design and stands behind it.

CRC sessions help to design and align the high-level object design and collaboration of your system with the whole team. During such sessions new team members can learn from the experience and explanations of tropers.

This is how we often conduct a CRC Session:
* Preparation:
    * Make sure everybody has a high-level overview of the software (bounded context / use case overview). Because design should also focus on the long term.
    * Choose some scenarios (such as "customer adds a promoted product to cart and sees the discounts...") that you want to discuss in this session
* Collect candidates for classes:
    * For the first session, it makes sense to search for potential candidates for classes.
    * Just put them on a whiteboard. Often nouns in scenarios are good candidates.
    * Put the most promising ones on Post-its. (You can add more at any time)
* CRC session:
    * 1 or 2 people stand up and try to explain the scenario with the help of the classes.
    * This is similar to explaining a sequence diagramm and the cards are put on the table from left to right. During or after this, you can discuss design decisions and alternatives with the team.
    * After this, someone else can stand up and present a potential alternative sequence.
    * Once the team is aligned on a version they want to implement, it makes sense that it is repeated by different persons. Being exact is very important and avoids the situation where people can have an individual understanding of the model. The model and the collaboration lives in the heads of the people in the team – therefore it is important that everyone understands it the same way.
* Closing:
    * We are often not too enthusiatic about adding a list of "collaborators" to the cards, since the sequence explains this very well.
    * So just take a picture and document the result somewhere, so that you can review the status for the next CRC session.
    * Maybe some decisions are worth being documented in your [Architecture decision records](/methods-and-patterns/adr.html)





