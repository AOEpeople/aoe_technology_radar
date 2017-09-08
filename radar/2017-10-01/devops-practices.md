---
title:      "Devops practices"
ring:       adopt
quadrant:   methods-and-patterns

---
DevOps is a term that has been around for some years now. We understand DevOps as a philosophy and culture with related practices and tools - all with the aim of bringing (IT) Operations closer to Development.  

Jez Humble described the devops movement like this: "a cross-functional community of practice dedicated to the study of building, evolving and operating rapidly changing, secure, resilient systems at scale".

With the size of software projects and the effects of agile development, the need to also deliver operation and infrastructure in an agile way increases more and more.

We have been using the following practices with success:

**Crossfunctional Teams "you build it, you run it"**

In the past year, we have moved from a more centralistic or standanlone IT and operations service team to crossfunctional teams with Infrastructure experts working in and with the development team (admins joining the project team).

And, we changed to crossfunctional teams and a "you build it, you run it" approach for the bigger projects. We have seen that this leads to the following positive effects:
* Software application architecture demands a certain infrastructure and the other way around. Having all the know-how in one team leads to more major decisions and implementations. Also, solving of root causes for problems works better.
* Rotating operation and incident management inside the whole team brings everyone into closer contact with the day-to-day operation of their software. This results in a shared and improved responsibility and commitment to the complete platform in the team. In addition, this brings developers into contact with the customer - which is an important feedback loop as well.
* Increased flexibility in the infrastructure: Implementations and adjustments in the infrastructure are faster and can be done together with the ongoing agile development of the platform.
* Developers also explicitly think of operation issues when building the application - since they are responsible for operation. For example, logging concept, monitoring aspects and resilience patterns are now explicitly optimized continuously and improve faster.
Important enabler of such an approach is the size and available budget for the project (not every project allows for having a continuous crossfunctional teams that carries out ongoing development and operations). Also, this requires a certain amount of independence for the team.

As always, we are establishing "community of interests" to improve and promote the knowledge transfer between different teams.

**Increase of relevant tools**

Another important aspect and also enabler of DevOps practices is the increase of certain tool and methods - some of them are also represented in the Tech Radar. For example: Puppet Environments; Docker; Cloud Services, Terraform, Consul etc.

**DevSetup = Prod Setup, [Infrastructure as a Code](methods-and-patterns/infrastructure-as-code.html)**

Keeping the development infrastructure setup close to production is also a commonly implemented practice and a direct result of the "Infrastructure as Code" method. Handling infrastructure and the required changes and innovations in ways similar to those used for applications is important; you can ready more about this here: Infrastructure as Code

We encourage all teams to adopt devops practices in the teams and to take care that there is a true collaboration between the different experts in a team and no invisible wall.
