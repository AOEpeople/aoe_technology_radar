---
title:      "RxJs"
ring:       trial
quadrant:   languages-and-frameworks

---
RX/JS aka reactive streams

RxJS is an implementation for the reactive programming paradigm which implements mostly the observer and iterator
pattern and follows the functional programming ideas. The pattern actually got a renaissance because it's not completely
new but has new implementations in many frameworks and languages like Angular, Akka, Spring and many more. Reason for 
that attention actually is (in the javascript world), that observables can be cancelled (by rules too) and  observables
can pass (stream) data on multiple events. Both aspects are not well realizable using promises e.g. and both were also
detected as a huge limitation in the JavaScript community — and so it's worth to get an understanding for reactive
programming in general.

We at AOE actually use RxJS in combination with Angular and think that it's worth to dive deeper into this paradigm.