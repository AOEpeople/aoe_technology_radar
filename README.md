# Volvofinans Technology Radar

A static site generator for Volvofinans Technology Radar based on [AOE Technology Radar](https://github.com/AOEpeople/aoe_technology_radar)

## Usage for your own radar?

The generator is free to use under Open Source License - in fact there are already some other Radars published based on our Radar and there are also Contributions back.
(There is a list of planned features below in case someone wants to contribute :-)

However please be aware:
* It would be nice to mention in radar that the generator is based on this repository.
* Also when you want to reuse the CSS and Styling: Change the font (it is a licensed font) and the colors (It using AOE CI)

## Use and build

Add the tech radar as a dependency
```
yarn add https://github.com/aoepeople/aoe_technology_radar.git
```

Build the radar
```
yarn aoe_technology_radar
```

Serve
```
cd build
python3 -m http.server 8083
```
Then open here: http://localhost:8083

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
ring:       emerging
quadrant:   languages-and-frameworks
---

Text goes here. You can use **markdown** here.
```

Following front-matter attributes are possible:

* **title**: Name of the Item
* **quadrant**: Quadrant. One of `languages-and-frameworks`,
  `methods-and-patterns`, `platforms-and-services`, `tools`
* **ring**: Ring section in radar. One of `emerging`, `appointed`, `preserving`, `sunset`
* **info**: (optional) A short textual description of the item (visible in
  overview pages)
* **featured**: (optional, default "true") If you set this to `false`, the item
  will not be visible in the radar quadrants but still be available in the overview.

The name of the .md file acts as item identifier and may overwrite items with
the same name from older releases.

If an item is overwritten in a new release, the attributes from the new item are
merged with the old ones and a new history entry is created for that item.
