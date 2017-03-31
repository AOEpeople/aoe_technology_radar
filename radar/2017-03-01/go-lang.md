---
title:      "Go / Golang"
ring:       assess
quadrant:   languages-and-frameworks

---

2016 was the year of Go, with a lot of Open Source projects gaining a lot of attention and many companies started to use it.

Go went from #54 to #13 on the [TIOBE index](http://www.tiobe.com/tiobe-index/) in January 2017, and it became the TIOBE programming language of the year 2016.

Here at AOE, we use several services written in Go on a daily basis, such as Mattermost, Docker, Consul and Kubernetes. Also, more and more applications, such as Gitlab, incorporate Go-based services to "off load" heavy work.

Go, as a programming language, has some very interesting features such as native support for concurrency (go routines), static compiled binaries with a very small memory footprint, cross compiling and much more. A big advantage of Go is the very flat learning curve, which allows developers from more dynamic languages such as PHP to be proficient in a very short time.

If you want to get a feeling for Go, you should start with the [online tour](https://tour.golang.org/welcome/1), within a day you'll have a good understanding of the core concepts, syntax, etc. - that is also because the language often tries to provide only one simple way of doing things; an example for this is that code formatting and styling is defined (yet not enforced as in Python). Part of this is also that Go itself is very opinionated: So, for example, for object oriented programming in Go, composition is the prefered way of defining data structures, and some might miss advanced concepts such as inheritance.

We currently use Go for projects and microservices where we need flexibility and performance.
