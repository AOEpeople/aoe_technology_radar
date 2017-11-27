# AOE Technology Radar

A static site generator for AOE Technology Radar

## Installation

```
> git clone git@github.com:AOEpeople/aoe_technology_radar.git
> cd aoe_technology_radar
> yarn install
> yarn watch
```

_A new [browser tab](http://127.0.0.1:8080/techradar) should open up - wait
until last command has finished and refresh._

## Usage

For a new Technology Radar release, create a folder of the release date
(YYYY-MM-DD) under `/radar`. In each release folder create a folder for every
quadrant and place the items there.

### Maintaining items

The items are written in Markdown format (.md)

Each file has a [front-matter](https://github.com/jxson/front-matter) header
where the attributes of the item are listed:

```
---
title:      "React"
ring:       adopt
quadrant:   languages-and-frameworks
---

Text goes here. You can use **markdown** here.
```

Following front-matter attributes are possible:

* **title**: Name of the Item
* **quadrant**: Quadrant. One of `languages-and-frameworks`,
  `methods-and-patterns`, `platforms-and-aoe-services`, `tools`
* **ring**: Ring section in radar. One of `trial`, `assess`, `adopt`, `hold`
* **info**: (optional) A short textual description of the item (visible in
  overview pages)
* **featured**: (optional, default "true") If you set this to `false`, the item
  will not be visibile on the homepage anymore but still available in the radar
  overview.

The name of the .md file acts as item identifier and may overwrite items with
the same name from older releases.

If an item is overwritten in a new release, the attributes from the new item are
merged with the old ones and a new history entry is created for that item.

## Travis

[![Travis](https://api.travis-ci.org/AOEpeople/aoe_technology_radar.svg?branch=master)](https://travis-ci.org/AOEpeople/aoe_technology_radar/)

## Todos

* [x] Add Icons
* [x] Implement search
* [ ] Finalize CSS
* [x] Get contents for how-to-use page
* [ ] Show item history on details (relevant with 2nd release)
* [ ] Better semantic and SEO
* [ ] Make mobile friendly
* [ ] Add mobile navigation and search
* [ ] Create more react components for already existing CSS comps
* [ ] Refactor hardcoded subfolder in routing
* [ ] Unit test for radar generation :see_no_evil:
