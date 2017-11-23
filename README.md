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

## Usage

For a new Technology Radar release, create a folder of the release date (YYYY-MM-DD) under `/radar`. In each release folder create a folder for every quadrant and place the items there.

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

The name of the .md file acts as item identifier and may overwrite items with the same name from older releases.

If an item is overwritten in a new release, the attributes from the new item are merged with the old ones and a new history entry is created for that item.

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
