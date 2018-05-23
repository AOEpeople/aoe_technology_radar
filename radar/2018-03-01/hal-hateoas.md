---
title:      "HAL / HATEOAS"
ring:       trial
quadrant:   methods-and-patterns

---
We still recommend the usage of HAL and HATEOAS.
 
But, depending on the resource structure, there are some pitfalls to be aware of:
- Increased amount of HTTP calls
- Parallelization of client-side calls is more difficult or even impossible when following links on heavily nested resource structures
- Consumer side code might get larger  
