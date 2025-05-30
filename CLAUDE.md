# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Development
npm run dev          # Start development server with hot-reloading

# Building
npm run build:data   # Parse markdown files to JSON (run this first when content changes)
npm run build        # Production build (creates static export in ./out)

# Code Quality
npm run lint         # Run ESLint
npm run fix          # Format code with Prettier
```

## Architecture Overview

This is a **Next.js 14 static site generator** for visualizing technology adoption using a radar chart. The system transforms markdown files into an interactive technology radar.

### Data Flow
1. **Content Creation**: Markdown files in `/data/radar/YYYY-MM-DD/` with frontmatter metadata
2. **Build Process**: `buildData.ts` parses markdown → generates `data.json` with calculated positions
3. **Static Generation**: Next.js exports static HTML/CSS/JS to `/out`
4. **Deployment**: Serves static files from `technology-radar.mohara.co`

### Key Components

**Data Processing** (`scripts/buildData.ts`):
- Parses markdown files from dated release folders
- Tracks revision history across releases
- Calculates radar positions using `Positioner` class
- Validates quadrant/ring values against config

**Radar Visualization** (`src/components/Radar/`):
- SVG-based interactive chart
- Blips positioned by polar coordinates
- Legend shows items grouped by ring
- Responsive design with mobile support

**Content Structure**:
```
data/radar/YYYY-MM-DD/technology.md
---
title: Technology Name
ring: adopt|trial|assess|hold
quadrant: languages-and-frameworks|ai|platforms-and-operations|tools-and-techniques
tags: [optional, tags]
featured: true|false
---
Markdown content here
```

### Development Workflow

1. **Adding Technologies**: Create `.md` file in new date folder under `/data/radar/`
2. **Updating Technologies**: Copy existing file to new date folder and modify
3. **Building**: Run `npm run build:data` then `npm run build`
4. **Testing Changes**: Use `npm run dev` to preview locally

### Important Configuration

- `data/config.json`: Defines quadrants, rings, colors, and optional tag filtering
- `src/lib/config.ts`: Loads and validates configuration
- `next.config.js`: Static export configuration
- No test suite - verify changes manually in development server

### Commit Convention

Uses conventional commits enforced by commitlint:
- `feat:` New features
- `fix:` Bug fixes
- `chore:` Maintenance tasks
- `docs:` Documentation updates