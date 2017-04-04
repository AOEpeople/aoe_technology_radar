---
title:      "RxJava"
ring:       trial
quadrant:   tools

---

[RxJava](https://github.com/ReactiveX/RxJava) is the Open Source Java implementation of ReactiveX. The main concept heavily relies on the Observer- (and Subscriber)-Pattern. An Observer emits a stream of data, which can be consumed by Subscribers. The Subscriber reacts (That's where the 'Rx' comes from) asynchronously to those data events. Reactive Extensions were originally developed by Mircosoft's Erik Meijer and his team and have been ported to all major programming languages after being released to the public as Open Source software. We use RxJava (but actually RxAndroid to be precise) in the Congstar Android App to let the UI layer react to changes in the underlaying data layer.
