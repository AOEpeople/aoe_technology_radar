---
title: "MCP Servers (Utilising)"
ring: assess
quadrant: platforms-and-operations
tags: [mcp, ai, agents, productivity]
featured: true
---

**Reason for selection**

Model Context Protocol (MCP) servers act as "USB-C ports" for AI agents. Turnkey servers (Context7, FS, Shell, Postgres, Vector Search) could deliver instant code-context and DB insight to AI IDEs.  

**Key questions**

- Which servers deliver the biggest DX win for mo-stack (code search, Tailwind docs, Supabase queries)?  
- Setup effort: one-liner vs k8s?  
- Maintenance, OSS vitality and licensing quirks.  

**Assessment approach**

1. Enable Context7, FS, Shell, Postgres (or Supabase) MCPs on a demo project.  
2. Task list per tester: feature flag, run Vitest, author Expo screen, tweak Drizzle migration.  
3. Record task time, hallucinations, security misfires; score 0-5 on DX, perf, security, setup, cost.  
4. Workshop to pick a default server set for adoption.  

**Potential testers**

- Cursor & Windsurf power-users; senior engineers across active projects; benchwarmers.