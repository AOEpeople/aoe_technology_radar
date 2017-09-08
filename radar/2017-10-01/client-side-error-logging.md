---
title:      "Client-side error logging"
ring:       trial
quadrant:   methods-and-patterns

---

More and more business logic is done client-side with various web and app technologies. How do we know if everything works in production? We can easily track backend exceptions in the server logs, but what about client-side errors in the user's browser or mobile app?

With client-side error logging, we send errors to a central server to see instantly what is going wrong. With this method errors can be found and resolved quickly before they affect even more users.

At AOE, we use the Open Source solution [Sentry](https://sentry.io/welcome/).io. It can handle multiple projects and teams and integrates well with other services such as Mattemost/Slack and Issue Tracking Systems.
