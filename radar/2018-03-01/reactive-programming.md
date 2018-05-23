---
title:      "Reactive Programming"
ring:       trial
quadrant:   methods-and-patterns

---

Classic (web-) applications typically consist of transactions that submit
large forms to the server side, which then processes these and, in response, returns HTML
for the browser to render. Today's applications have more and more
fine-grained 'real-time'-like aspects: A simple modification of a form field
could trigger a complete roundtrip to the server including other services and
persistence. Naturally, all of these transactions should respect the
expectations of a user who wants a highly interactive application.

"Reactive Programming" tries to provide an answer to the challanges mentioned above
by raising the level of abstraction. This allows you to focus on the stream of
events that make up your business logic in a responsive, asynchronous fashion.

There are various descriptions of what Reactive Programming actually is - at
the most general level it is programming with asynchronous data streams and
contains tools to create, manipulate, combine and filter these streams. Under the term
"Reactive Programming", we summarize the principles and implementations that
underlie [ReactiveX](http://reactivex.io/) and the [Reactive
Manifesto](https://www.reactivemanifesto.org/). 

"Reactive Programming" is employed in many of our services – frontend and
backend – but not always as an explicitly choosen pattern. As different
plattforms have different means to tackle this style of programming, we choose
to include "Reactive Programming" as a general Method and Patterns Item in
addition to concrete libraries and APIs such as
[Rx.JS](languages-and-frameworks/rxjs.html) or [Akka
Streams](/languages-and-frameworks/akka-streams.html) to highlight the
importance of the approach in general.
