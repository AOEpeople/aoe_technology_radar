---
title:      "Job DSL (Jenkins)"
ring:       trial
quadrant:   tools

---
The [Job DSL ](https://wiki.jenkins-ci.org/display/JENKINS/Job+DSL+Plugin)is a plugin for the Jenkins automation server. Jenkins jobs that automate parts of a software project are usually configured using the web interface of Jenkins. If Jenkins is the choice for your project and the number of build jobs tend to grow, the Job DSL plugin is your friend.

The plugin allows Jenkins jobs to be described by code (Groovy DSL). This code is then used for generating Jenkins jobs. As a consequence, job configuration can be part of the project's source code. During the generation step, existing jobs are synchronized, overwritten or left alone, depending on the configuration. The same configuration manages deleting or ignoring jobs that are not described in code anymore. Jobs can easily be restored in case of data loss and changed without clicking buttons for hours. The automation also makes it easy to seed large numbers of homogeneous components and builds on different branches.

The ability to treat Jenkins jobs as code is a big advantage. We highly suggest that every team automate the setup of their jobs and their pipelines. Another way of expressing build pipelines as code is the new [Jenkins Pipeline](https://jenkins.io/doc/book/pipeline/) feature - but still we see the need of Job DSL seeder jobs to seed the Jenkins pipeline jobs themselves and any additional jobs.
