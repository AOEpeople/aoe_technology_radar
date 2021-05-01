import {Item, HomepageOption, QuadrantConfig} from './model';

export const radarName = process.env.RADAR_NAME || 'AOE Technology Radar'
export const radarNameShort = radarName;

export const homepageContent = HomepageOption.both; // by defaul show both versions so that people can choose which one they like more (or keep both)

// Quadrants positions start from the top left and go clockwise
export const quadrantsMap: Map<string, QuadrantConfig> = new Map([
  ['languages-and-frameworks', {
    id: 'languages-and-frameworks',
    displayName: 'Languages & Frameworks',
    colour: '#84BFA4',
    txtColour: '#444444',
    position: 1,
    description: "We've placed development languages (such as Scala or Golang) here, as well as more low-level development frameworks (such as Play or Symfony), which are useful for implementing custom software of all kinds."
  }],
  ['methods-and-patterns', {
    id: 'methods-and-patterns',
    displayName: 'Methods & Patterns',
    colour: '#248EA6',
    txtColour: 'white',
    position: 2,
    description: 'Here we put information on methods and patterns concerning development, continuous x, testing, organization, architecture, etc.'
  }],
  ['platforms-and-aoe-services', {
    id: 'platforms-and-aoe-services',
    displayName: 'Platforms and Operations',
    colour: '#F25244',
    txtColour: '#444444',
    position: 3,
    description: 'Here we include infrastructure platforms and services. We also use this category to communicate news about AOE services that we want all AOE teams to be aware of.'
  }],
  ['tools', {
    id:  'tools',
    displayName: 'Tools',
    colour: '#F2A25C',
    txtColour: 'white',
    position: 4,
    description: 'Here we put different software tools - from small helpers to bigger software projects'
  }]
]);

export const chartConfig = {
    size: 800, //in px
    scale: [-16, 16],
    blipSize: 12, // in px, be careful when increasing this value as it may cause a lot of calculations during placing the blips on the chart
    ringsAttributes: [ // order from the centre outwards
      { radius: 8, arcWidth: 6 }, // radius values are based on the scale (not px!), arc width is in px
      { radius: 11, arcWidth: 4 },
      { radius: 14, arcWidth: 2 },
      { radius: 16, arcWidth: 2 }
    ]
};

export const getItemPageNames = (items: Item[]) => items.map(item => `${item.quadrant}/${item.name}`);

export const showEmptyRings = false;

export function isMobileViewport() {
    // return false for server side rendering
    if (typeof window == 'undefined') return false;

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width < 1200;
}

export function assetUrl(file: string) {
    return process.env.PUBLIC_URL + '/' + file;
    // return `/techradar/assets/${file}`
}
