---
title:      "Serverless"
ring:       productize
quadrant:   infrastructure-and-operational-technology

---

## Why? ##

AWS and Azure both provide the new exciting way of **serverless** applications/functions.
Main features/promises are:

- No worry about the infrastructure - no servers to manage
- Pay-per-use pricing model
- Continuous scaling

That allows to create small apps called on demand and to run the apps with minimal costs.
The functionality might be triggered by various sources like Http-Request, Timer-trigger, Database Trigger, Event Trigger
Maintenance effort for the infrastructure is highly reduced.

But with the use of the technology the app is tied to the cloud provider. You can't switch to a traditional hoster anymore or run the service OnPremise.

## Technology choices/solutions ##

- [AWS Lambda](https://aws.amazon.com/lambda/?nc1=h_ls)
- [Azure functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview)

## Our projects ##

### AWS Lambda ###

The foundational services teams is currently using AWS Lambda mostly for tasks outside the critical path. As a custom resource for CloudFormation, it allows the team to manage all aspects of a deployment in an elegant way by simply deploying a new CloudFormation stack. Baking AMIs and doing green/blue switches are only two of the many use cases where AWS Lambda comes in very handy.

In addition to deployment automation, the team is using AWS Lambda to process incoming data. Being able to respond to events from various sources such as S3 Buckets, SNS topics, Kinesis streams and HTTP endpoints it's a perfect match to process, transform and forward incoming data in near-realtime at a fraction of the cost of running an ESB.

### Azure functions ###

Azure functions are used at Haufe-Lexware Real Estate to implement some REST based Web-Services like News-Service and a Service to exchange data with partners.
It is planned that these services are used in wowinex in the upcoming year 2018.
It is fairly easy to develop Azure functions. You have a lot of choices regarding the development language.
The key driver for the decision to use Azure functions was scalability. If the service are not used we wanted to waste no money. On the other hand we wanted to be able to handle a growing amount of customers and traffic.

## Contact ##

Raul Firu <raul.firu@domain.com>, Rainer Zehnle <rainer.zehnle@haufe-lexware.com>, Frederik Michel <frederik.michel@haufe-lexware.com>
