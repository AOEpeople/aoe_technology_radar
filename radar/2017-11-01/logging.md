---
title:      "Logging"
ring:       scale
quadrant:   infrastructure-and-operational-technology

---

## Why? ##

After development, any application/service is stripped of debugging functionality or instrumentation.

The only chance to keep an eye out for success/failure is to observe the system(s) for

- logging information
- monitoring data
- telemetric data

### Logging ###

... is providing information from "inside" the application/service about:

- events (user interaction, incoming requests, ...)
- actions (processing data, writing files, sending messages, ...)
- issues (low memory, exhausted storage, unreachable services, ...)
- ...

Logging data is required to give proof of **correct execution** (and thereby can be used for solving problems). It is very likely organized along the structure and architecure of the software.

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

