---
title:      "Consul"
ring:       assess
quadrant:   tools

---
Consul is a lightweight service to provide a service discovery registry with failure detection (health checks) for circuit breakers. It also provides configuration management with key/value storage.\
The typical way to use it is that a consul master cluster takes care of the update and write processes and consul clients run locally on the apps host - data is shared accross the complete Consul cluster. The data can be accessed by using DNS and HTTP APIs.

At AOE, we use Consul for settings distribution with consul-template as a way to do [Settings Injection](/methods-and-patterns/settings-injection.html) during deployment. Consul is also used as service discovery between apps inside [microservice](/methods-and-patterns/microservices.html) environments.

With Vault there is another tool that can be used to manage and share secrets.
