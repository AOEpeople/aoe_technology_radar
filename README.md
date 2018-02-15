# Haufe Technology Radar

A static site generator for Haufe Technology Radar

## Installation

```cmd

> git clone https://github.com/Haufe-Lexware/aoe_technology_radar.git
> cd aoe_technology_radar
> npm install
> npm run watch
```

*A new browser tab should open up - wait until last command has finished and refresh.*

## Original version

The Haufe Technology radar is a fork of the AOE technology radar, that you can find on [https://github.com/AOEpeople/aoe_technology_radar](https://github.com/AOEpeople/aoe_technology_radar).
Thanks a lot to AOE to provide such a cool tech radar implementation!

## Working on the Content

The content of the tech radar is located in the folder  `/radar`. To organize progress over time, the files are structured in subfolders with the release date (YYYY-MM-DD).
For each item there must be one markdown file (*.md).

### Maintaining items

The items are written in Markdown format (.md)

Each file has a [front-matter](https://github.com/jxson/front-matter) header where the attributes of the item are listed:

```markdown

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
- **hidden**: (optional) Set to `true` in order to hide the item. E.g. when under development.

#### Quadrant values and their meaning ####
- `data-science-and-analytics` means Data Science & Analytics   
All data related technologies and trends like BigData, Business Intelligence, Artifical Intelligence (AI,KI) and Machine Learning are placed here.

- `infrastructure-and-operational-technology` means Infrastructure & Operational Technology   
Technologies reaching from Cloud over DevOps, Containerization, Continous Integration/Delivery/Deployment, Build Pipelines, Monitoring, Logging

- `platforms-and-partners` means Platforms & Partners   
Technologies useful for product/system collaboration and composable new product forms like APIs, API Management, Partner Platform, Collaboration, Integration
- `ui-and-devices` means UI & Devices   
New forms of user interfaces like voice (Amazon Alexa), Chatbots, Virtual/Artifical/Mixed reality devices, Mobile devices and also other IoT devices including Smart Home

#### Ring section values and their meaning ####

Each of the items is classified in one of these rings:
- `discover`   
 We discover the value of a technology and proof the value for us and our customers. That is typically the stage were we work on PoCs and unrisky tests in apps.
- `productize`
We use it in one or a small amount of products and gather experinece with our customers.
- `scale`   
We use it in many products and teams and it has proven to be stable and useful.

### Template

It is strongly recommended to use the **_template.md** file as a template for new items. 
It also contains the structure that should be used for all items with helpful explanations about the audience and view point to write the content.

### History

The name of the .md file acts as item identifier.

If an item also exists in a newer release, the attributes from the new item are merged with the old ones.
The content of the md-files is also merged. The content of the newest file is displayed first in the radar followed by the older content.

### Use GitHub to work on content

The easiest way to work on the *.md files is the usage of GitHub.
Use the branch `PrepareContent` to change the md files.
Simply switch to [PrepareContent branch](https://github.com/Haufe-Lexware/aoe_technology_radar/tree/PrepareContent/radar/2017-11-01) and start to edit the md files.
Currently we work in the folder `radar/2017-11-01`.
Commit your changes with a short note what you changed.
I will merge the changes from time to time to the master branch.

### Who should fill out which technology file? ###
Just take a look in the file [Technology List](./technologylist.md).

## Deployment

The deployment is based on docker. Use the dockerfile in the project to create a haufetechradar docker image.

```docker

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

```cmd

docker build --no-cache -t haufetechradar .
docker run -e SERVER_NAMES=localhost -p "8080:80" haufetechradar

```

## Available instances ##

We have two available instances running on Azure.

### Test-Version ###

The test version is available at [http://hg-tr-test.westeurope.cloudapp.azure.com/techradar/](http://hg-tr-test.westeurope.cloudapp.azure.com/techradar/).
It reflects the content and version of the **PrepareContent** branch.
A new deployment is triggered whenever the branch **PrepareContent** is changed.

### Prod-Version ###

The production version is available at [http://hg-tr-prod.westeurope.cloudapp.azure.com/techradar/](http://hg-tr-prod.westeurope.cloudapp.azure.com/techradar/)
It reflects the content and version of the **master** branch.
A new deployment is triggered whenever the branch **master** is changed.

## Todos

- [ ] Work on the content
- [ ] Implement circle diagram view of the data
