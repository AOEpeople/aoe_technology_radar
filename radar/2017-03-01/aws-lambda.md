---
title:      "AWS Lambda"
ring:       trial
quadrant:   platforms-and-aoe-services

---
AWS Lambda is one of the exciting new "cloud-native" / serverless ways to run code without worrying about infrastructure. While it is possible to directly respond to web requests using the API Gateway, our teams are currently using AWS Lambda mostly for tasks outside the critical path. As a custom resource for CloudFormation, it allows us to manage all aspects of a deployment in an elegant way by simply deploying a new CloudFormation stack. Baking AMIs and doing green/blue switches are only two of the many use cases where AWS Lambda comes in very handy.

In addition to deployment automation, we're using AWS Lambda to process incoming data. Being able to respond to events from various sources such as S3 Buckets, SNS topics, Kinesis streams and HTTP endpoints it's a perfect match to process, transform and forward incoming data in near-realtime at a fraction of the cost of running an ESB.
