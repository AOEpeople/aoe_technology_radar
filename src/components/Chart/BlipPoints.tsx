import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";
import { quadrantsMap, ringsMap } from '../../config';

const generateCoordinates = (enrichedBlip, xScale, yScale) => {
    const pi = Math.PI;
    // radian between 5 and 85
    const randomDegree = ((Math.random() * 80 + 5) * pi) / 180;
    const radius = enrichedBlip.ringPosition - 0.2;
    const r = Math.random() * 0.6 + (radius - 0.6);
    // multiples of PI/2
    const shift = pi * [1, 4, 3, 2][enrichedBlip.quadrantPosition - 1] / 2;

    return {
        x: xScale(Math.cos(randomDegree + shift) * r),
        y: yScale(Math.sin(randomDegree + shift) * r)
    };
};

const distanceBetweenPoints = (point1, point2) => {
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
        blip.ringPosition = ringsMap[blip.ring].position;
        blip.quadrantPosition = quadrantsMap[blip.quadrant].position;
        blip.colour = quadrantsMap[blip.quadrant].colour;

        let point;
        let counter = 1;
        do {
            point = generateCoordinates(blip, xScale, yScale);
            counter++;
            // generate position of the new blip until it has a satisfactory distance to every other blip
            // this feels pretty inefficient, but good enough for now
        } while (list.some(item => distanceBetweenPoints(point, item) < 8) || counter > 100);

        blip.x = point.x;
        blip.y = point.y;

        list.push(blip);
        return list;
    }, []);

    const el = ReactFauxDOM.createElement('g');

    d3.select(el)
        .attr('class', 'circles')
        .selectAll('circle')
        .data(enrichedBlips)
        .enter().append('circle')
        .attr('fill', blip => blip.colour)
        .attr('r', 3)
        .attr('data-value', blip => blip.title)
        .attr('cx', blip => blip.x)
        .attr('cy', blip => blip.y)

    return el.toReact();
}