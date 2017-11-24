# Haufe Technology Radar

A static site generator for Haufe Technology Radar

## Installation

```
> git clone https://github.com/Haufe-Lexware/aoe_technology_radar.git
> cd aoe_technology_radar
> npm install
> npm run watch
```
*A new browser tab should open up - wait until last command has finished and refresh.*

## Original version

The Haufe Technology radar is a fork of the AOE technology radar, that you can find on https://github.com/AOEpeople/aoe_technology_radar.
Thanks a lot to AOE to provide such a cool tech radar implementation!

## Working on the Content

The content of the tech radar is located in the folder  `/radar`. To organize progress over time, the files are structured in subfolders with the release date (YYYY-MM-DD).
For each item there must be one markdown file (*.md).

### Maintaining items

The items are written in Markdown format (.md)

Each file has a [front-matter](https://github.com/jxson/front-matter) header where the attributes of the item are listed:
  ```
  ---
  title:      "Machine Learning"
  ring:       discover
  quadrant:   data-science-and-analytics
  ---

  Text goes here. You can use **markdown** here.

  ```

Following front-matter attributes are possible:
- **title**: Name of the Item
- **quadrant**: Quadrant. One of `data-science-and-analytics`, `infrastructure-and-operational-technology`, `platforms-and-partners`, `ui-and-devices`
- **ring**: Ring section in radar. One of `discover`, `productize`, `scale`
- **info**: (optional) A short textual description of the item (visible in overview pages)

### Template
It is recommended to use **_template.md** file as a template for new items. It contains the structure that should be uses for all items with some explanation how to use it.

### History
The name of the .md file acts as item identifier.

If an item also exists in a newer release, the attributes from the new item are merged with the old ones.
The content of the md-files is merged.  The content of the newest file is displayed first.

### Use GitHub to work on content
The easiest way to work on the *.md files is the usage of GitHub.
Use the branch `PrepareContent` to change the md files.
Simply switch to [PrepareContent branch](https://github.com/Haufe-Lexware/aoe_technology_radar/tree/PrepareContent/radar/2017-11-21) and start to edit the md files.
Commit your changes with a short note what you changed.
I will merge the changes from time to time to the master branch.

## Deployment

The deployment is based on docker. Use the dockerfile in the project to create a haufetechradar docker image.

``` 

FROM node:7.10.1 as source
WORKDIR /src/haufe-techradar
COPY . ./
RUN npm install
RUN npm run build:all

FROM nginx:1.13.5
WORKDIR /opt/haufe-techradar
COPY --from=source /src/haufe-techradar/dist .
COPY default.template /etc/nginx/conf.d/default.template
CMD /bin/bash -c "envsubst < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

```

To run the image locally use:

```

docker build --no-cache -t haufetechradar .
docker run -e SERVER_NAMES=localhost -p "8080:80" haufetechradar

```

## Todos

-  [ ] Work on the content 
-  [ ] Implement circle diagram view of the data 
