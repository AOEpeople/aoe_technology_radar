# CHT Technology Radar Core
A static site generator for the CHT Technology Radars.

## Looking for the CHT Technology Radars content?
The repository for the [CHT Technology Radar for Implementers](https://docs.communityhealthtoolkit.org/cht-tech-radar-implementers/index.html) can be found [here](https://github.com/medic/cht-tech-radar-implementers).

The repository for the [CHT Technology Radar for Contributors](https://docs.communityhealthtoolkit.org/cht-tech-radar-contributors/index.html) can be found [here](https://github.com/medic/cht-tech-radar-contributors).

### Use and build the radar
Create a new npm project and add the tech radar as a dependency:
```
npm i cht_technology_radar
```

Build the radar:
```
npx cht_technology_radar-buildRadar
```

Generate the `rd.json` file containing the radar data:
```
npx cht_technology_radar-generateJson
```

Run the Prepare script:
```
npm run prepare
```

Serve:
```
cd build
python3 -m http.server 8080
```

Then open the generated radar here: http://localhost:8080/.

### Run a prepared static version

To have a better SEO ranking or deploy to S3, you can generate a html file for every page.

Requirements
* Build the radar
* Generate the `rd.json` file

```
npx cht_technology_radar-createStaticFiles
```

## Customize the tech radar
You can customize the following parts of the tech radar.

### Change title, description and headline
Set the environment variable `REACT_APP_RADAR_NAME`. The default is "CHT Technology Radar".

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

### Edit from published radar
You can activate the `editLink` feature which will display a small edit button next to a technology which let's you jump directly to a gitlab / github / etc. edit page:

```json
{
  // ...
  "editLink": {
    "radarLink": "https://github.com/medic/cht-tech-radar-contributors/tree/main/radar",
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
  "rings":["all", "adopt", "trial", "assess", "stop"],
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
    { "href": "https://forum.communityhealthtoolkit.org/", "iconName": "todo" },
    { "href": "https://github.com/medic", "iconName": "github" }
  ]
}
```

> For more information and the possible icon names see the source code of the [SocialLink Component](./src/components/SocialLink/SocialLink.tsx).

### Add a legal information link to the footer and sidebar
To add a link to legal information, create a public folder in your application and put a `messages.json` in it.
```json
{
  "legalInformationLink": "https://docs.google.com/document/d/1MaI1rgYMNyCZF2eEjBuvnBDoCYHDKlx4k_N5pkDiWu8/edit#heading=h.9sdb6g11dv40"
}
```

### Add a footnote with the logo to the footer
To add a footnote to the footer, create a public folder in your application and put a `messages.json` in it.
```json
{
  "footerFootnote": "The Community Health Toolkit (CHT) is a project by a group of leading organizations who have come together to support the development of digital health initiatives in the hardest-to-reach areas. It provides a collection of open source technologies and open access design, technical, and implementer resources that help you build and deploy digital tools for community health. Together, we envision a world where healthcare is of the highest attainable quality, equitable, accessible, and delivered by people who are trusted in their communities."
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
          "It's essential for a development toolkit such as the Community Health Toolkit to constantly improve and keep track with the latest useful innovations. It is important to openly look for innovations and new technologies and to question established technologies and methods every now and then.",
          "But, it is also important to wisely choose which technologies to use in our daily work and in the different projects we are carrying out. As we all know: There is no silver bullet."
        ]
      },
      {
        "headline": "What is the Technology Radar",
        "values": [
          "The CHT Technology Radar for Contributors provides an useful view for developers to know what languages/tools/platforms/techniques to use while contributing to CHT tools themselves."
        ]
      },
      {
        "headline": "Audience",
        "values": [
          "Contributors, developers, engineers"
        ]
      },
      {
        "headline": "How it is created",
        "values": [
          "The items in the technology radar are raised by the different contributors and therefore a lot of the items are related to the work and challenges the contributors face in the different initiatives. In fact, we don't include anything on the radar that we haven't tried ourselves at least once.",
          "There have been a lot of valuable discussions in different expert groups about the classification and details of each of technologies and innovations. And the result of all this can be found in the latest technology radar."
        ]
      },
      {
        "headline": "How should it be used",
        "values": [
          "The radar acts as an overview of technologies that we think everyone in the community should currently know about.",
          "Its goal is to act as a guide and inspiration for the daily work in the community. Its purpose is also to provide helpful information and a bird's-eye perspective - so that decisions can be taken with a much deeper understanding of the subject matter. This results in more informed and coordinated decisions.",
          "We also hope that developers outside of CHT Community find the information in our technology overview inspirational.",
          "We group or categorize the items in 4 quadrants - (sometimes, when it's not 100% clear where a item belongs, we choose the best fit)."
        ]
      }
    ],
    "quadrants": [
      {
        "name": "Languages & Frameworks",
        "description": "These include development languages, as well as more low-level development frameworks, which are useful for implementing custom software of all kinds."
      },
      {
        "name": "Tools",
        "description": "These can be components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistence."
      },
      {
        "name": "Techniques",
        "description": "These include elements of a software development process, such as experience design; and ways of structuring software, such as microservices."
      },
      {
        "name": "Platforms",
        "description": "Things that we build software on top of such as mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds."
      }
    ],
    "rings": [
      {
        "name": "Adopt",
        "description": "The Adopt ring represents blips that we think you should seriously consider using. We don't say that you should use these for every project; any tool should only be used in an appropriate context. However we do think that a blip in the Adopt ring represents something where there's no doubt that it's proven and mature for use."
      },
      {
        "name": "Trial",
        "description": "The Trial ring is for blips that we think are ready for use, but not as completely proven as those in the Adopt ring. So for most organizations we think you should use these on a trial basis, to decide whether they should be part of your toolkit. Typically we've used trial blips in production, but we realize that readers are more cautious than us."
      },
      {
        "name": "Assess",
        "description": "The Assess ring are things to look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you. Typically, blips in the Assess ring are things that we think are interesting and worth keeping an eye on."
      },
      {
        "name": "Stop",
        "description": "The Stop ring is for things that, even though they are accepted in the industry, we haven't had a good experience with. Therefore we are calling them out to warn you that you may run into trouble with them as well. Sometimes it means we think they're irredeemably flawed, or just being misused. We do place things in the Stop ring that we wish the industry wouldn't use."
      }
    ],
    "sourcecodeLink": {
      "href": "https://github.com/medic/cht-tech-radar-contributors",
      "name": "CHT Technology Radar for Contributors on GitHub",
      "description": "Contributions and source code of the CHT Technology Radar for Contributors are on GitHub. Inspired by AOE Tech Radar."
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

## Note
The CHT Technology Radars are built starting from the [AOE Tech Radar content](https://www.aoe.com/techradar/index.html).
If you want to build your own Technical Radar you may want to have a look at [AOE Tech Radar GitHub repository](https://github.com/AOEpeople/aoe_technology_radar).
