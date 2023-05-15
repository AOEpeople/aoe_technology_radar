import { ScaleLinear } from "d3";
import React from "react";

import { ConfigData } from "../../config";
import { Blip, FlagType, Item, Point } from "../../model";
import Link from "../Link/Link";
import { ChangedBlip, DefaultBlip, NewBlip } from "./BlipShapes";

/*
See https://medium.com/create-code/build-a-radar-diagram-with-d3-js-9db6458a9248
for a good explanation of formulas used to calculate various things in this component
*/

function generateCoordinates(
  blip: Blip,
  xScale: ScaleLinear<number, number>,
  yScale: ScaleLinear<number, number>,
  config: ConfigData
): Point {
  const pi = Math.PI,
    ringRadius = config.chartConfig.ringsAttributes[blip.ringPosition].radius,
    previousRingRadius =
      blip.ringPosition === 0
        ? 0
        : config.chartConfig.ringsAttributes[blip.ringPosition - 1].radius,
    ringPadding = 0.7;

  // radian between 0 and 90 degrees
  const randomDegree = ((blip.angleFraction || Math.random()) * 90 * pi) / 180;
  // random distance from the centre of the radar, but within given ring. Also, with some "padding" so the points don't touch ring borders.
  const radius = pointBetween(
    previousRingRadius + ringPadding,
    ringRadius - ringPadding,
    blip.radiusFraction || Math.random()
  );

  /* 
    Multiples of PI/2. To apply the calculated position to the specific quadrant.
    Order here is counter-clockwise, so we need to "invert" quadrant positions (i.e. swap 2 with 4)
    */
  const shift = (pi * [1, 4, 2, 3][blip.quadrantPosition - 1]) / 2;

  return {
    x: xScale(Math.cos(randomDegree + shift) * radius),
    y: yScale(Math.sin(randomDegree + shift) * radius),
  };
}

function pointBetween(min: number, max: number, amount: number): number {
  return amount * (max - min) + min;
}

function distanceBetween(point1: Point, point2: Point): number {
  const a = point2.x - point1.x;
  const b = point2.y - point1.y;
  return Math.sqrt(a * a + b * b);
}

function renderBlip(
  blip: Blip,
  index: number,
  config: ConfigData
): JSX.Element {
  const props = {
    blip,
    className: "blip",
    fill: blip.colour,
    "data-background-color": blip.colour,
    "data-text-color": blip.txtColour,
    "data-tip": blip.title,
    key: index,
  };
  switch (blip.flag) {
    case FlagType.new:
      return <NewBlip {...props} config={config} />;
    case FlagType.changed:
      return <ChangedBlip {...props} config={config} />;
    default:
      return <DefaultBlip {...props} config={config} />;
  }
}

const BlipPoints: React.FC<{
  items: Item[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  config: ConfigData;
}> = ({ items, xScale, yScale, config }) => {
  const blips: Blip[] = items.reduce((list: Blip[], item: Item) => {
    if (!item.ring || !item.quadrant) {
      // skip the blip if it doesn't have a ring or quadrant assigned
      return list;
    }
    const quadrantConfig = config.quadrantsMap[item.quadrant];
    if (!quadrantConfig) {
      return list;
    }

    let blip: Blip = {
      ...item,
      quadrantPosition: quadrantConfig.position,
      ringPosition: config.rings.findIndex((r) => r === item.ring),
      colour: quadrantConfig.colour,
      txtColour: quadrantConfig.txtColour,
      coordinates: { x: 0, y: 0 },
    };

    let point: Point;
    let counter = 1;
    let distanceBetweenCheck: boolean;
    do {
      const localpoint = generateCoordinates(blip, xScale, yScale, config);
      point = localpoint;
      counter++;
      /*
            Generate position of the new blip until it has a satisfactory distance to every other blip (so that they don't touch each other)
            and quadrant borders (so that they don't overlap quadrants)
            This feels pretty inefficient, but good enough for now.
            */
      distanceBetweenCheck = list.some(
        (b) =>
          distanceBetween(localpoint, b.coordinates) <
          config.chartConfig.blipSize + config.chartConfig.blipSize / 2
      );
    } while (
      counter < 100 &&
      (Math.abs(point.x - xScale(0)) < 15 ||
        Math.abs(point.y - yScale(0)) < 15 ||
        distanceBetweenCheck)
    );

    blip.coordinates = point;

    list.push(blip);
    return list;
  }, []);

  return (
    <g className="blips">
      {blips.map((blip, index) => (
        <Link pageName={`${blip.quadrant}/${blip.name}`} key={index}>
          {renderBlip(blip, index, config)}
        </Link>
      ))}
    </g>
  );
};

export default BlipPoints;
