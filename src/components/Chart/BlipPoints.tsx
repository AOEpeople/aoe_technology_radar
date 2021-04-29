import React from 'react';
import {FlagType, Ring} from '../../model';
import { quadrantsMap, chartConfig } from '../../config';
import Link from '../Link/Link';
import { NewBlip, ChangedBlip, DefaultBlip } from './BlipShapes';

/*
See https://medium.com/create-code/build-a-radar-diagram-with-d3-js-9db6458a9248
for a good explanation of formulas used to calculate various things in this component
*/

const generateCoordinates = (enrichedBlip, xScale, yScale) => {
    const pi = Math.PI,
        ringRadius = chartConfig.ringsAttributes[enrichedBlip.ringPosition - 1].radius,
        previousRingRadius = enrichedBlip.ringPosition == 1 ? 0 : chartConfig.ringsAttributes[enrichedBlip.ringPosition - 2].radius,
        ringPadding = 0.7;

    // radian between 0 and 90 degrees
    const randomDegree = ((Math.random() * 90) * pi) / 180;
    // random distance from the centre of the radar, but within given ring. Also, with some "padding" so the points don't touch ring borders.
    const radius = randomBetween(previousRingRadius + ringPadding, ringRadius - ringPadding);
    /* 
    Multiples of PI/2. To apply the calculated position to the specific quadrant.
    Order here is counter-clockwise and starts at the top left, so we need to "invert" quadrant positions
    */
    const shift = pi * [4, 3, 2, 1][enrichedBlip.quadrantPosition - 1] / 2;

    return {
        x: xScale(Math.cos(randomDegree + shift) * radius),
        y: yScale(Math.sin(randomDegree + shift) * radius)
    };
};

const randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
};

const distanceBetween = (point1, point2) => {
    const a = point2.x - point1.x;
    const b = point2.y - point1.y;
    return Math.sqrt((a * a) + (b * b));
};

export default function BlipPoints({blips, xScale, yScale}) {

    const enrichedBlips = blips.reduce((list, blip) => {
        if (!blip.ring || !blip.quadrant) {
            // skip the blip if it doesn't have a ring or quadrant assigned
            return list;
        }
        let enrichedBlip = { ...blip,
            quadrantPosition: quadrantsMap[blip.quadrant].position,
            ringPosition: Ring[blip.ring],
            colour: quadrantsMap[blip.quadrant].colour,
            txtColour: quadrantsMap[blip.quadrant].txtColour
        };

        let point;
        let counter = 1;
        do {
            point = generateCoordinates(enrichedBlip, xScale, yScale);
            counter++;
            /*
            Generate position of the new blip until it has a satisfactory distance to every other blip (so that they don't touch each other)
            and quadrant borders (so that they don't overlap quadrants)
            This feels pretty inefficient, but good enough for now.
            */
        } while (counter < 100
                && (Math.abs(point.x - xScale(0)) < 15
                    || Math.abs(point.y - yScale(0)) < 15
                    || list.some(item => distanceBetween(point, item) < chartConfig.blipSize + chartConfig.blipSize / 2)
                ));

        enrichedBlip.x = point.x;
        enrichedBlip.y = point.y;

        list.push(enrichedBlip);
        return list;
    }, []);

    const renderBlip = (blip, index) => {
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
    }

    return (
        <g className="blips">
            {enrichedBlips.map((blip, index) => (
                <Link pageName={`${blip.quadrant}/${blip.name}`} key={index}>
                    {renderBlip(blip, index)}
                </Link>
            ))}
        </g>
    );
};