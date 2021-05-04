import React from 'react';
import { ScaleLinear } from 'd3';
import { FlagType, Item, Blip, Point, Ring } from '../../model';
import { quadrantsMap, chartConfig } from '../../config';
import Link from '../Link/Link';
import { NewBlip, ChangedBlip, DefaultBlip } from './BlipShapes';

/*
See https://medium.com/create-code/build-a-radar-diagram-with-d3-js-9db6458a9248
for a good explanation of formulas used to calculate various things in this component
*/

function generateCoordinates(blip: Blip, xScale: ScaleLinear, yScale: ScaleLinear): Point {
    const pi = Math.PI,
        ringRadius = chartConfig.ringsAttributes[blip.ringPosition - 1].radius,
        previousRingRadius = blip.ringPosition == 1 ? 0 : chartConfig.ringsAttributes[blip.ringPosition - 2].radius,
        ringPadding = 0.7;

    // radian between 0 and 90 degrees
    const randomDegree = ((Math.random() * 90) * pi) / 180;
    // random distance from the centre of the radar, but within given ring. Also, with some "padding" so the points don't touch ring borders.
    const radius = randomBetween(previousRingRadius + ringPadding, ringRadius - ringPadding);
    /* 
    Multiples of PI/2. To apply the calculated position to the specific quadrant.
    Order here is counter-clockwise, so we need to "invert" quadrant positions (i.e. swap 2 with 4)
    */
    const shift = pi * [1, 4, 3, 2][blip.quadrantPosition - 1] / 2;

    return {
        x: xScale(Math.cos(randomDegree + shift) * radius),
        y: yScale(Math.sin(randomDegree + shift) * radius)
    };
};

function randomBetween (min: number, max: number): number {
    return Math.random() * (max - min) + min;
};

function distanceBetween(point1: Point, point2: Point): number {
    const a = point2.x - point1.x;
    const b = point2.y - point1.y;
    return Math.sqrt((a * a) + (b * b));
};

function renderBlip(blip: Blip, index: number): JSX.Element {
    const props = {
        blip,
        className: 'blip',
        fill: blip.colour,
        'data-background-color': blip.colour,
        'data-text-color': blip.txtColour,
        'data-tip': blip.title,
        key: index
    }
    switch (blip.flag) {
        case FlagType.new:
          return <NewBlip {...props} />;
        case FlagType.changed:
          return <ChangedBlip {...props} />;
        default:
          return <DefaultBlip {...props} />;
      }
};

const BlipPoints: React.FC<{
    items: Item[]
    xScale:ScaleLinear
    yScale:ScaleLinear
}> = ({items, xScale, yScale}) => {

    const blips: Blip[] = items.reduce((list: Blip[], item: Item) => {
        if (!item.ring || !item.quadrant) {
            // skip the blip if it doesn't have a ring or quadrant assigned
            return list;
        }
        const quadrantConfig = quadrantsMap.get(item.quadrant);

        let blip: Blip = { ...item,
            quadrantPosition: quadrantConfig.position,
            ringPosition: item.ring,
            colour: quadrantConfig.colour,
            txtColour: quadrantConfig.txtColour
        };

        let point;
        let counter = 1;
        do {
            point = generateCoordinates(blip, xScale, yScale);
            counter++;
            /*
            Generate position of the new blip until it has a satisfactory distance to every other blip (so that they don't touch each other)
            and quadrant borders (so that they don't overlap quadrants)
            This feels pretty inefficient, but good enough for now.
            */
        } while (counter < 100
                && (Math.abs(point.x - xScale(0)) < 15
                    || Math.abs(point.y - yScale(0)) < 15
                    || list.some(b => distanceBetween(point, b.coordinates) < chartConfig.blipSize + chartConfig.blipSize / 2)
                ));

        blip.coordinates = point;

        list.push(blip);
        return list;
    }, []);

    return (
        <g className="blips">
            {blips.map((blip, index) => (
                <Link pageName={`${blip.quadrant}/${blip.name}`} key={index}>
                    {renderBlip(blip, index)}
                </Link>
            ))}
        </g>
    );
};

export default BlipPoints;