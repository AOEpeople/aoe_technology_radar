# AOE Technology Radar
A static site generator for AOE Technology Radar

## Looking for the AOE Tech Radar content?
The repository is now found here: https://github.com/AOEpeople/techradar

The AOE Tech radar is deployed here: https://www.aoe.com/techradar/index.html

## Usage for your own radar?
The generator is free to use under Open Source License - in fact there are already some other Radars published based on our Radar and there are also Contributions back.

However, please be aware:

- It would be nice to mention in radar that the generator is based on this repository.
- Also, when you want to reuse the CSS and Styling: Change the font (it is a licensed font) and the colors (It using AOE CI)

## Customize the tech radar
You can customize the following parts of the tech radar.

### Change title, description and headline
Set the environment variable `REACT_APP_RADAR_NAME`. The default is "AOE Technology Radar".

### Host the application under a sub path
To host the application under a sub path, set the environment variable `PUBLIC_URL`, e.g. "/techradar". The default is "/build".

### Change the favicon
To change the favicon, create a public folder in your application and put your favicon.ico in it.

### Change the logo
To change the logo, create a public folder in your application and put your logo.svg in it.
For reference have a look at [public/logo.svg](./public/logo.svg).

### Change the index.html
To change the index.html, create a public folder in your application and put your index.html in it.
For reference have a look at [public/index.html](./public/index.html).

## Use and build the radar
> Set the environment variable `PUBLIC_URL` properly. For more information see [Host the application under a sub path](#host-the-application-under-a-sub-path)

Add the tech radar as a dependency
```
yarn add https://github.com/aoepeople/aoe_technology_radar.git
```

Generate json file based on md files
```
yarn aoe_technology_radar-generateJson
```

Build the radar
```
yarn aoe_technology_radar-buildRadar
```

Serve
```
python3 -m http.server 8080
```

Then open here: http://localhost:8080/build

### Run a prepared static version
To have a better SEO ranking, you can generate a html file for every page.

Requirements
* Generate the json file
* Build the radar

```
yarn aoe_technology_radar-createStaticFiles
```

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

- **title**: Name of the Item
- **quadrant**: Quadrant. One of `languages-and-frameworks`,
  `methods-and-patterns`, `platforms-and-aoe-services`, `tools`
- **ring**: Ring section in radar. One of `trial`, `assess`, `adopt`, `hold`
- **info**: (optional) A short textual description of the item (visible in
  overview pages)
- **featured**: (optional, default "true") If you set this to `false`, the item
  will not be visible in the radar quadrants but still be available in the overview.

The name of the .md file acts as item identifier and may overwrite items with
the same name from older releases.

If an item is overwritten in a new release, the attributes from the new item are
merged with the old ones, and a new history entry is created for that item.

You can integrate images in your markdown. Put the image files in your public folder and reference them

```
![nice image](/images/nice-image.png)
```

## Development
For local development you need a `rd.json` in the public folder. You can use `rd_example.json`.
Then simply start the dev server

```
yarn start
```

### Change scripts
If you change one of the scripts in the scripts' folder, you have to compile them to JavaScript.
Therefore, run `yarn build:scripts` and commit the results in dist_scripts.

To make it more robust the script will be executed on commit.
