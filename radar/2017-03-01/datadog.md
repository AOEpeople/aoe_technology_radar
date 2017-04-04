---
title:      "Datadog"
ring:       assess
quadrant:   platforms-and-aoe-services

---

After realizing that AWS CloudWatch isn't flexible enough, and running our own metrics aggregation, monitoring and altering isn't something we want to do ourselves, we decided to give Datadog a try. Datadog is very simple to set up and retrieves metrics from the AWS API (and many other integrations) and from an agent running on the EC2 instances. On top of that, it comes with many plugins for services such as Apache, NGINX and ElasticSearch, allowing us to track all important metrics without much effort. Creating dashboards, setting up alarms and integrating into other applications (such as ticket systems) is easy to do and works fine.
