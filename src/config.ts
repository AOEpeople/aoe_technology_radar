import {Item} from './model';

export const radarName = process.env.RADAR_NAME || 'AOE Technology Radar'
export const radarNameShort = radarName;

export const quadrants = [
    'languages-and-frameworks',
    'methods-and-patterns',
    'platforms-and-aoe-services',
    'tools',
];

// Quadrants positions start from the top left and go clockwise
export const quadrantsMap = {
    'languages-and-frameworks': {
      displayName: 'Languages & Frameworks',
      colour: '#84BFA4',
      position: 1
    },
    'methods-and-patterns': {
      displayName: 'Methods & Patterns',
      colour: '#248EA6',
      position: 2
    },
    'platforms-and-aoe-services': {
      displayName: 'Platforms and Operations',
      colour: '#F25244',
      position: 3
    },
    'tools': {
      displayName: 'Tools',
      colour: '#F2A25C',
      position: 4
    },
  };
  
const chartMargin = 20,
    chartSize = 900;
export const chartConfig = {
    margin: chartMargin,
    size: chartSize,
    canvasSize: chartSize - chartMargin * 2
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
      displayName: 'TRIAL',
      position: 2
    },
    'assess': {
      displayName: 'ASSESS',
      position: 3
    },
    'hold': {
      displayName: 'HOLD',
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

const messages: { [k: string]: string } = {
    'languages-and-frameworks': 'Languages & Frameworks',
    'methods-and-patterns': 'Methods & Patterns',
    'platforms-and-aoe-services': 'Platforms and Operations',
    'tools': 'Tools',
};

export const translate = (key: string) => (messages[key] || '-');

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
