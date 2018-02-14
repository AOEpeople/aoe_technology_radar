---
title:      "Monitoring/Telemetry"
ring:       scale
quadrant:   infrastructure-and-operational-technology

---

## Why? ##

After development, any application/service is stripped of debugging functionality and instrumentation.

The only chance to keep an eye on success/failure is to observe the system(s) for

- logging information
- monitoring data
- telemetric data


### Monitoring ###

... is observing the application/service, its runtime environment and infrastructure "from the outside" in (almost) realtime. 

Possible results are:

- availability (application/service/virtual machine/host/network/...)
- performance metrics
- storage/memory/CPU indicators
- ...

Monitoring data is being used to **control and manage** the application/service "in time". It helps to get "the right fit" of the infrastructure (scaling) or enables runtime management according to SLAs. 


### Telemetry ###

... is any kind of **usage** information about the application/service and its runtime environment. 

Think about:

- number of records in db
- most often used function
- time spent in dialog 
- ...

Telemetric data is somewhat similar to Monitoring data, but is meant to be used "somewhere else" and mostly for statistical purposes. It is especially required for improvement of software/services based on usage info.


## Technology choices/solutions

- [Logging in containers/on platforms](https://12factor.net/logs)
- [jvm log library - log4j](https://logging.apache.org/log4j/)
- [.net log library - nlog](http://nlog-project.org/)
- [Log forwarding - fluentd/fluentbit](https://www.fluentd.org/)

## Our projects ##
List of projects and activities

- [Logging - Best-Practices](https://github.com/Haufe-Lexware/Logging---Best-Practices/blob/master/README.md)
- [Central logmanagement]()

## Contact ##
Thomas Schüring <thomas.schuering@haufe-lexware.com>
Andreas Plaul <Andreas.Plaul@haufe-lexware.com>
