# AOE Technology Radar

A static site generator for AOE Technology Radar

## Usage for your own radar?
The generator is free to use under Open Source License - in fact there are already some other Radars published based on our Radar and there are also Contributions back.
(There is a list of planned features below in case someone wants to contribute :-)

However please be aware:
* The text and descriptions for the articles in the "radar" are copyright protected by AOE and they are not allowed to use in your radar
* It would be nice to mention in radar that the generator is based on this repository.
* Also when you want to reuse the CSS and Styling: Change the font (it is a licensed font) and the colors (It using AOE CI)

## Installation

```
git clone git@github.com:AOEpeople/aoe_technology_radar.git
cd aoe_technology_radar
yarn
yarn watch
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
  will not be visible in the radar quadrants but still be available in the overview.

The name of the .md file acts as item identifier and may overwrite items with
the same name from older releases.

If an item is overwritten in a new release, the attributes from the new item are
merged with the old ones and a new history entry is created for that item.

## Travis

* [![Travis](https://api.travis-ci.org/AOEpeople/aoe_technology_radar.svg?branch=master)](https://travis-ci.org/AOEpeople/aoe_technology_radar/)
  (master)

* [![Travis](https://api.travis-ci.org/AOEpeople/aoe_technology_radar.svg?branch=next)](https://travis-ci.org/AOEpeople/aoe_technology_radar/)
  (next)

## Todos

* [x] Add Icons
* [x] Implement search
* [ ] Finalize CSS
* [x] Get contents for how-to-use page
* [ ] Tagging Items (Show Tags / Linking related items automatically)
* [ ] Filter by Tags in overview
* [ ] Show item history on details (relevant with 2nd release)
* [ ] Better semantic and SEO
* [ ] Make mobile friendly
* [ ] Add mobile navigation and search
* [ ] Create more react components for already existing CSS comps
* [ ] Refactor hardcoded subfolder in routing
* [ ] Unit test for radar generation :see_no_evil:
