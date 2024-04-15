---
title: "Graal Native Image"
ring: trial
quadrant: tools
tags: [coding]
---

Native Image is a technology to ahead-of-time compile Java code to a standalone executable, called a native image.
In the process of building a native image all library dependencies, including those from the JDK will be packed in the native image.
The application created as a native image can be run without a JDK.
The natively compiled applications require generally less memory and have shorter start up times.

We at DCX have already running microservices written in Scala with Graal Native Image.
