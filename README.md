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

### Add social links to the footer and sidebar
To add social links, create a public folder in your application and put a messages.json in it.
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
To add a link to legal information, create a public folder in your application and put a messages.json in it.
```json
{
  "legalInformationLink": "https://www.aoe.com/en/imprint.html"
}
```

### Add a footnote with the logo to the footer
To add a footnote to the footer, create a public folder in your application and put a messages.json in it.
```json
{
  "footerFootnote": "AOE is a leading global provider of services for digital transformation and digital business models. AOE relies exclusively on established Enterprise Open Source technologies. This leads to innovative solutions, digital products and portals in agile software projects, and helps build long-lasting, strategic partnerships with our customers."
}
```

### Add a help page with explanations
To add a help page, create a public folder in your application and put a messages.json in it.
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
    ]
  }
}
```

> For more information see the source code of the [Messages Context](./src/context/MessagesContext/index.tsx).

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
For local development you need a `rd.json` in the public folder. You can use [rd_example.json](./rd_example.json).
For several customizations you need a `messages.json` in the public folder. You can use [messages_example.json](./messages_example.json).
Then simply start the dev server

```
yarn start
```

### Change scripts
If you change one of the scripts in the scripts' folder, you have to compile them to JavaScript.
Therefore, run `yarn build:scripts` and commit the results in dist_scripts.

To make it more robust the script will be executed on commit.
