---
title:      "Infrastructure as Code"
ring:       adopt
quadrant:   methods-and-patterns

---

Infrastructure as Code (IaC) describes the process of managing all infrastructure resources via code. Treating infrastructure code the same way we treat application code, we can benefit from the same advantages of having a history in our version control system, doing code reviews and rolling out updates via a Continuous Delivery pipeline in a way that closely approaches how we handle application deployments.

Infrastructure code is often described in a declarative language und the target platforms figure out what to create, update or delete in order to get to the desired state, while doing this in a safe and efficient way. We've worked with [AWS CloudFormation](https://aws.amazon.com/de/cloudformation/) in the past, and while this is a great tool, you can only manage AWS resources with it and you need some more tooling around it in order to automate things nicely and embed it into other processes such as Jenkins Jobs. That's what we created [StackFormation](https://github.com/AOEpeople/StackFormation) for. Another tool that is actively developed is [Terraform](https://www.terraform.io/). Terraform comes with a lot of concepts that make managing environments easier out of the box and nicely embeds into other related tools. Also, Terraform allows you to manage a variety of different infrastructure providers.

Infrastructure as code should cover everything from orchestration of your infrastructure resources, networking and provisioning as well as monitoring setup. The orchestration tools mentioned above are supplemented by other tools such as Puppet, Chef or simple Bash scripts that take over provisioning the instances after they are booted.
