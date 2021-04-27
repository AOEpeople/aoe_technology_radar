# AOE Technology Radar

A static site generator for AOE Technology Radar

## Looking for the AOE Tech Radar content?

The repository is now found here: https://github.com/AOEpeople/techradar

The AOE Tech radar is deployed here: https://www.aoe.com/techradar/index.html

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
python3 -m http.server 8080
```
Then open here: http://localhost:8080

## Run a prepared static version

In most cases you have the techradar available at `/techradar`, and for reasons want all correct pages to be accessable.

Until this setup improves, you can use the following way to generate the correct techradar:

```
PUBLIC_URL=techradar/ yarn aoe_technology_radar
yarn aoe_technology_radar-static
cp -r build techradar
```

(This is rather workaroundish for now, but does the job.)

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

## Local development

1. Copy the `src/rd.json_` file and save it as `src/rd.json`.
1. Copy the `src/index.tsx_` file and save it as `src/index.tsx`.
1. Run `./scripts/start` to start a local dev server.
1. Access the local app at [http://localhost:3000/techradar](http://localhost:3000/techradar).

