---
title: "Python for Infrastructure Glue Code"
ring: assess
quadrant: platforms-and-operations
tags: [devops, coding]
---

[Python](https://www.python.org) is an easy to learn programming language that is pre-installed on most Linux distributions and CI runners.
This makes it an ideal candidate for infrastructure glue code and adapters.

Shell scripts serve the same purpose.
But they usually start simple and get more complex over time.
This is the point where Python's features like testing capabilities, modularity, variable scoping and refactoring support comes in strong.
We found that Python scripts are easier maintained in the long run and pose a lower barrier for contributions by our development teams.
And they run across platforms and shells without much trouble which is a big plus for developers running different operating systems.

The Python language has a wide eco-system and a vast module library that can simplify scripting significantly.
We currently value [requests](https://pypi.org/project/requests/) for HTTP API calls and [Click](https://click.palletsprojects.com/en/7.x/) for simple interactive CLI scripts, along with [pytest](https://docs.pytest.org/) for automated testing.
