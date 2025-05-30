---
title: "Payload CMS for Admin Panel"
ring: assess
quadrant: platforms-and-operations
tags: [admin-panel, cms, nextjs]
featured: true
---

**Reason for selection**

Refine is OK but rigid; Payload gives a full admin UI, REST & GraphQL APIs, migrations and shared types—potentially one app instead of two.  

**Key questions**

- Does it meet our admin-dashboard feature set (vs Django Admin, Refine)?  
- Can we share types/schemas across the monorepo?  
- Does it remove Refine's pain-points (re-typing, deep abstraction)?  

**Assessment approach**

1. Drop Payload into the mo-stack; spin up a demo project.  
2. Validate type-sharing and custom access-control patterns.  
3. Compare dev effort and UX with existing Refine builds.  

**Potential testers**

- Any tech lead interested in admin tooling.