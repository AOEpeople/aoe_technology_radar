# AOE Technology Radar
A static site generator for AOE Technology Radar

## Looking for the AOE Tech Radar content?
The repository is now found here: https://github.com/AOEpeople/techradar

The AOE Tech radar is deployed here: https://www.aoe.com/techradar/index.html

## Create your own radar
The generator is free to use under Open Source License - in fact there are already some other Radars published based on our Radar and there are also Contributions back.

However, please be aware:

- It would be nice to mention in radar that the generator is based on this repository.
- Also, when you want to reuse the CSS and Styling: Change the font (it is a licensed font) and the colors (It using AOE CI)

### Use and build the radar
Create a new npm project and add the tech radar as a dependency
```
npm i aoe_technology_radar
```

Build the radar
```
npx aoe_technology_radar-buildRadar
```

Generate the `rd.json` file containing the radar data
```
npx aoe_technology_radar-generateJson
```

Run the Prepare script
```
npm run prepare
```

Serve
```
cd build
python3 -m http.server 8080
```

Then open here: http://localhost:8080/

### Run a prepared static version

To have a better SEO ranking or deploy to S3, you can generate a html file for every page.

Requirements
* Build the radar
* Generate the `rd.json` file

```
npx aoe_technology_radar-createStaticFiles
```

## Authoring Techradar contents
For a new Technology Radar release, create a folder of the release date (YYYY-MM-DD) under `./radar`.

### Maintaining items
The items are written in Markdown format (.md)

Each file has a [front-matter](https://github.com/jxson/front-matter) header where the attributes of the item are listed:

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

## Customize the tech radar
You can customize the following parts of the tech radar.

### Change title, description and headline
Set the environment variable `REACT_APP_RADAR_NAME`. The default is "AOE Technology Radar".

Set the environment variable `REACT_APP_RADAR_TITLE_FORMAT` to define the title format for each technology page.
You can use two placeholders here:

- `%TECHNOLOGY_NAME%`: The name of the technology will be inserted
- `%APP_TITLE%`: The base app name (from `REACT_APP_RADAR_NAME`) will be inserted

For example: `%TECHNOLOGY_NAME% | %APP_TITLE%`

### Host the application under a sub path
To host the application under a sub path, set the environment variable `PUBLIC_URL`, e.g. "/techradar". The default is "/".

### Change the favicon
To change the favicon, create a folder named `public` and put your `favicon.ico` in it.

### Change the logo
To change the logo, create a folder named `public` and put your `logo.svg` in it.

For reference have a look at [public/logo.svg](./public/logo.svg).

### Change the date format
By default the Date format used in the app is `"MMMM YYYY"`.
You can change this by editing the `config.js` file as shown below.
Please be sure you are entering a valid [moment.js format string](https://momentjs.com/docs/#/displaying/format).

```json
{
  // ...
  "dateFormat": "MMMM YYYY"
}
```

For reference have a look at [public/logo.svg](./public/logo.svg).

### Edit from published radar
You can activate the `editLink` feature which will display a small edit button next to a technology which let's you jump directly to a gitlab / github / etc. edit page:

```json
{
  // ...
  "editLink": {
    "radarLink": "https://github.com/AOEpeople/techradar/edit/main/radar",
    "title": "Edit"
  }
}
```

### Change the rings and quadrants config
To change the default rings and quadrants of the radar, you can place a custom `config.json` file within the `public` folder.
The `showEmptyRings` option can be enabled to display the header for a ring even when it contains no items (helpful to
reinforce the order of the rings).
The content should look as follows:

```json
{
  "quadrants": {
    "languages-and-frameworks": "Languages & Frameworks",
    "methods-and-patterns": "Methods & Patterns",
    "platforms-and-operations": "Platforms & Operations",
    "tools": "Tools"
  },
  "rings":["all", "adopt", "trial", "assess", "hold"],
  "showEmptyRings": true
}
```

### Filter with tags / create different Radars
To create different radars with one set of blips put a `tags` entry in your frontmatter:
```yaml
---
title: Item
ring: adopt
quadrant: tools
tags: [radar-1, radar-2]
---
```

Then, to select the blips put a `tags` entry in the `config.json` for generating the site:
```json
{
  "tags": ["radar-1"],
  "quadrants": {
    ...
```

This will only add blips with the defined tags into the output.

### Change the index.html
To change the index.html, create a public folder in your application and put your `index.html` in it.

For reference have a look at [public/index.html](./public/index.html).

### Change the fonts
To change the fonts, create a public folder in your application and put your fonts in it.

Create a `fonts.css` in the public folder and load your fonts.
> For now only 2 fonts will be used: `DIN normal` and `DIN 300`.
> Therefore, you only can replace the font files itself, but need to use the font-family and font-weight.
```css
@font-face {
    font-family: "DIN";
    src: url("fonts/yourFontFileForNormal");
    font-weight: normal;
}

@font-face {
    font-family: "DIN";
    src: url("fonts/yourFontFileForThin");
    font-weight: 300;
}
```

For reference have a look at [public/fonts.css](./public/fonts.css).

### Change the styles

To change the styles, create a `styles.css` in the `public` folder and apply your style modifications.
Styles defined in `public/styles.css` will overload the default styles.

For reference have a look at [src/styles/main.scss](./src/styles/main.scss) and all it's included files.

> Important: The custom styles must be defined as pure CSS,
> as there is no further pre-processing of other file formats such as SCSS for custom style overloads.

You can also reference custom icons or images in your styles as follows.
The icons should be placed in the `public` folder as well (e.g. in a specific `icons` or `images` directory):

```css
body {
  background-image: url('/images/my-custom-background-image.png');
}
```

### Add social links to the footer and sidebar
To add social links, create a public folder in your application and put a `messages.json` in it.
```json
{
  "socialLinks": [
    { "href": "https://www.facebook.com/aoepeople", "iconName": "facebook" },
    { "href": "https://twitter.com/aoepeople", "iconName": "twitter" },
    { "href": "https://www.linkedin.com/company/aoe", "iconName": "linkedIn" }
  ]
}
```

> For more information and the possible icon names see the source code of the [SocialLink Component](./src/components/SocialLink/SocialLink.tsx).

### Add a legal information link to the footer and sidebar
To add a link to legal information, create a public folder in your application and put a `messages.json` in it.
```json
{
  "legalInformationLink": "https://www.aoe.com/en/imprint.html"
}
```

### Add a footnote with the logo to the footer
To add a footnote to the footer, create a public folder in your application and put a `messages.json` in it.
```json
{
  "footerFootnote": "AOE is a leading global provider of services for digital transformation and digital business models. AOE relies exclusively on established Enterprise Open Source technologies. This leads to innovative solutions, digital products and portals in agile software projects, and helps build long-lasting, strategic partnerships with our customers."
}
```

> The footnote information may include HTML like `<a href="https://foo.bar">My Link</a>` which will be sanitized.

### Add a help page with explanations
To add a help page, create a public folder in your application and put a `messages.json` in it.
```json
{
  "pageHelp": {
    "paragraphs": [
      {
        "headline": "Introduction",
        "values": [
          "Technology is moving fast and new technologies and innovations appear continuously.",
          "It's essential for a development and technology company such as AOE to constantly improve and keep track with the latest useful innovations. It is important to openly look for innovations and new technologies and to question established technologies and methods every now and then.",
          "But, it is also important to wisely choose which technologies to use in our daily work and in the different projects we are carrying out. As we all know: There is no silver bullet."
        ]
      },
      {
        "headline": "What is the AOE Technology Radar",
        "values": [
          "The Tech Radar is an overview of different technologies - from languages, frameworks, tools and patterns to platforms - that we consider \"new or mentionable\". The radar therefore doesn't provide an overview of all established technologies - but it focuses on items that have recently gained in importance or changed."
        ]
      }
    ],
    "quadrants": [
      {
        "name": "Languages and Frameworks",
        "description": "We've placed development languages (such as Scala or Golang) here, as well as more low-level development frameworks (such as Play or Symfony), which are useful for implementing custom software of all kinds."
      },
      {
        "name": "Tools",
        "description": "Here we put different software tools - from small helpers to bigger software projects"
      },
      {
        "name": "Methods and Patterns",
        "description": "Patterns are so important, and a lot of them are valid for a long time (compared to some tools or frameworks). So, this is the category where we put information on methods and patterns concerning development, continuous x, testing, organization, architecture, etc."
      },
      {
        "name": "Platforms and Operations",
        "description": "(including AOE internal Services): Here we include infrastructure platforms and services. We also use this category to communicate news about AOE services that we want all AOE teams to be aware of."
      }
    ],
    "rings": [
      {
        "name": "Adopt",
        "description": "We can clearly recommend this technology. We have used it for longer period of time in many teams and it has proven to be stable and useful."
      },
      {
        "name": "Trial",
        "description": "We have used it with success and recommend to have a closer look at the technology in this ring. The goal of items here is to look at them more closely, with the goal to bring them to the adopt level."
      },
      {
        "name": "Assess",
        "description": "We have tried it out and we find it promising. We recommend having a look at these items when you face a specific need for the technology in your project."
      },
      {
        "name": "Hold",
        "description": "This category is a bit special. Unlike the others, we recommend to stop doing or using something. That does not mean that they are bad and it often might be ok to use them in existing projects. But we move things here if we think we shouldn't do them anymore - because we see better options or alternatives now."
      }
    ],
    "sourcecodeLink": {
      "href": "https://github.com/AOEpeople/aoe_technology_radar",
      "name": "AOE Tech Radar on Github",
      "description": "Contributions and source code of the AOE Tech Radar are on github:"
    }
  }
}
```

> The information in `description`s  for `rings` and `quadrants` as well as the `values` for `paragraphs` may include HTML like `<a href="https://foo.bar">My Link</a>` which will be sanitized.

> For more information see the source code of the [Messages Context](./src/context/MessagesContext/index.tsx).

## Development
Then simply start the dev server:
```
npm run start
```

### Change scripts
If you change one of the scripts in the scripts' folder, you have to compile them to JavaScript.

Therefore, run `npm run build:scripts` and commit the results in dist_scripts.

To make it more robust the script will be executed on commit.
