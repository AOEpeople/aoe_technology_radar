---
title: "Demo 5"
ring: trial
quadrant: tools
tags: [new]
---

This is a demo item illustrating the optimized internal linking convention.

### Internal Linking

The build process now automatically resolves internal IDs to their full quadrant paths.

**Example:**
This item references another entry: [Demo 4](demo-4).

During the build, the link above is automatically transformed:

- **Input:** `<a href="demo-4">`
- **Output:** `<a href="/techradar/tools/demo-4/">` (The quadrant is resolved automatically)

### Rules for Link Resolution:

- **Simplified ID:** Use only the item ID (e.g., `demo-4`). Do not include `.html` or leading slashes.
- **Allowed Characters:** Only alphanumeric characters, underscores (`_`), and hyphens (`-`) are processed.
- **Automatic Filtering:** Links containing dots (e.g., `file.html`), slashes (e.g., `/manual/`), or protocols (e.g., `https://`) are ignored by the mapper and kept as-is.
