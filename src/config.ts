import {Item} from './model';

export const radarName = process.env.RADAR_NAME || 'AOE Technology Radar'
export const radarNameShort = radarName;

// Quadrants positions start from the top right and go clockwise
export const quadrantsMap = { 
  'methods-and-patterns': {
    id: 'methods-and-patterns',
    displayName: 'Methods & Patterns',
    colour: '#248EA6',
    txtColour: 'white',
    position: 1,
    description: 'Optional description goes here'
  },
  'platforms-and-aoe-services': {
    id: 'platforms-and-aoe-services',
    displayName: 'Platforms and Operations',
    colour: '#F25244',
    txtColour: '#444444',
    position: 2,
    description: 'Optional description goes here'
  },
  'tools': {
    id:  'tools',
    displayName: 'Tools',
    colour: '#F2A25C',
    txtColour: 'white',
    position: 3,
    description: 'Optional descrption goes here'
  },
  'languages-and-frameworks': {
    id: 'languages-and-frameworks',
    displayName: 'Languages & Frameworks',
    colour: '#84BFA4',
    txtColour: '#444444',
    position: 4,
    description: 'Optional description goes here'
  },
};

export const chartConfig = {
    size: 800, //in px
    scale: [-16, 16],
    blipSize: 12, // in px, be careful when increasing this value as it may cause a lot of calculations during placing the blips on the chart
    ringsAttributes: [ // order from the centre outwards
      { radius: 8, arcWidth: 6 }, // radius values are based on the scale (not px!)
      { radius: 11, arcWidth: 4 },
      { radius: 14, arcWidth: 2 },
      { radius: 16, arcWidth: 2 }
    ]
};

export const rings = [
    'all',
    'adopt',
    'trial',
    'assess',
    'hold'
] as const;

// rings positions start at the centre and go outwards
export const ringsMap = {
  'adopt': {
    displayName: 'ADOPT',
    position: 1
  },
  'trial': {
    displayName: 'EXPLORE',
    position: 2
  },
  'assess': {
    displayName: 'ENDURE',
    position: 3
  },
  'hold': {
    displayName: 'RETIRE',
    position: 4
  }
};

// TODO replace with TS enum
export const blipFlags = {
  new: { name: 'new', short: 'N' },
  changed: { name: 'changed', short: 'C' },
  default: { name: 'default', short: '' }
}

export type Ring = typeof rings[number]

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
