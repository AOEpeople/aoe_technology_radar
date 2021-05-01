import React from 'react';
import { Blip } from '../../model';
import { chartConfig } from '../../config';

type VisualBlipProps = {
    className: string,
    fill: string,
    'data-background-color': string,
    'data-text-color': string,
    'data-tip': string,
    key: number
}

export const ChangedBlip: React.FC<
    {blip: Blip} & VisualBlipProps
> = ({blip, ...props}) => {
    const centeredX = blip.coordinates.x - chartConfig.blipSize/2,
        centeredY = blip.coordinates.y - chartConfig.blipSize/2;

    return (
        <rect
            transform={`rotate(-45 ${centeredX} ${centeredY})`}
            x={centeredX}
            y={centeredY}
            width={chartConfig.blipSize}
            height={chartConfig.blipSize}
            rx="3"
            {...props}
        />
    );
};

export const NewBlip: React.FC<
    {blip: Blip} & VisualBlipProps
> = ({blip, ...props}) => {
    const centeredX = blip.coordinates.x - chartConfig.blipSize/2,
        centeredY = blip.coordinates.y - chartConfig.blipSize/2;

    /*
    The below is a predefined path of a triangle with rounded corners.
    I didn't find any more human friendly way of doing this as all examples I found have tons of lines of code
    e.g. https://observablehq.com/@perlmonger42/interactive-rounded-corners-on-svg-polygons-using-d3-js
    */
    return (
        <path
            transform={`translate(${centeredX}, ${centeredY})`}
            d="M.247 10.212l5.02-8.697a2 2 0 013.465 0l5.021 8.697a2 2 0 01-1.732 3H1.98a2 2 0 01-1.732-3z"
            {...props}
        />
    );
};

export const DefaultBlip: React.FC<
    {blip: Blip} & VisualBlipProps
> = ({blip, ...props}) => {
    return (
        <circle
            r={chartConfig.blipSize / 2}
            cx={blip.coordinates.x}
            cy={blip.coordinates.y}
            {...props}
        />
    );
};