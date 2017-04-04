---
title:      "Puppet Environments"
ring:       assess
quadrant:   platforms-and-aoe-services

---

Puppet
------

Puppet is an Open Source configuration management tool. It is used by a wide range of different companies world-wide, e.g. the Wikimedia Foundation, Mozilla, Reddit, CERN, Dell, Rackspace, Twitter, the New York Stock Exchange, PayPal, Disney, Citrix Systems, Spotify, Oracle, the University of California Los Angeles, the University of North Texas, QVC, Intel, Google and others.

Puppet has been the basic tool to address Continuous Configuration Automation (CCA) in AOE's [Infrastructure as Code](/methods-and-patterns/infrastructure-as-code.html) strategy (IaC) for more than 4 years.

Puppet Environments
-------------------

Intended to give projects the means to develop and maintain their own infrastructure, separated and not influenced by other projects, Puppet environments, together with Puppet module versioning and ENC, have been introduced.\
Puppet Environments are rated "Trial". It supports our strategy of Infrastructure as Code (IaC) and links it to our DevOps approach, enabling project teams to set up and customize their own infrastructure. 

Teams that want to use the Puppet Environments service from the AOE IT Team will find detailed information about the implemented CI/CD process for this.

Internal from here regarding IT Core Puppet Environments:
=========================================================

To cope with different repositories holding the code for the environments, we decided not to use r10k for managing environments. Instead, setting up an environment is done via a bunch of Jenkins jobs clearly separating responsibilities and concerns of the project teams and the core IT team.

Principles
----------

* Management of Environments automated as much as possible
* Clear Interface between IT and Project Team
* Separation of Concern between IT and Project Team
* Inversion of Control (You are the framework)

Responsibilities and Concerns
-----------------------------

![Responsibilities and Concerns](/assets/images/puppet-responisbilities-and-concerns.png)

Puppet environments allow for shadowing the commonly used default set of modules depending on an node attribute assigning a host to a specific environment.\
Core IT is the owner of the default environment, providing and maintaining a stable base set of modules, which can be used by project teams. It covers company-wide aspects such as user management, base layout of hosts, integration into the company's infrastructure as well as commonly-used and well-established modules.\
Project teams are holding their own versions of modules in separate environment repositories. QA and deployment is managed by the project's own Jenkins. In this way a project team has full control over the nodes assigned to its environment. Copying over modules from the default environment repository to the project repository pins project infrastructure to exactly the copied version of the module. On the other hand, extending a module in the project environment only affects nodes in the environment, and no other nodes.

Use Cases
---------

Possible use cases are

* Production Environments using a frozen snapshot of the default environment, thus decoupling from further development in the default environment and mitigating the risk of instability.

* Puppet Module Development, restricting changes in the Puppet source code to dedicated test nodes.

* Project-specific Environments, separating development of infrastructure code independent from and not influenced by other projects.\
    This separation dramatically makes self-organization of the projects concerning infrastructure less daunting.

Rating
------

Puppet environments are rated "Trial". It supports our strategy of Infrastructure as Code (IaC) and links it to our DevOps approach, enabling project teams to set up and customize their own infrastructure. Additionally, they reduce interdependencies between projects and support the need for stability in critical production environments. Still, for historical reasons, dependencies between modules in the default environment and naming conflicts to standard modules provided by Puppet Forge are undermining the separation and independence of project environments, requiring further efforts in consolidating the existing code base.
