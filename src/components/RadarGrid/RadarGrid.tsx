import React from 'react';
import RadarChart from '../Chart/RadarChart';
import IconLink from '../IconLink/IconLink';
import { quadrantsMap } from '../../config';
import { Item, QuadrantConfig } from '../../model';

import './radar-grid.scss';

const QuadrantLabel: React.FC<{
    quadrant: QuadrantConfig
}> = ({quadrant}) => {
    
    const stylesMap = [
        {top: 0, left: 0},
        {top: 0, right: 0},
        {bottom: 0, right: 0},
        {bottom: 0, left: 0}
    ]

    return (
        <div className="quadrant-label" style={stylesMap[quadrant.position - 1]}>
            <div className="split">
                <div className="split__left">
                    <small>Quadrant {quadrant.position}</small>
                </div>
                <div className="split__right">
                    <IconLink icon="pie" pageName={`${quadrant.id}`} text="Zoom In" />
                </div>
            </div>
            <hr style={{borderColor: quadrant.colour}}/>
            <h4 className="headline">{quadrant.displayName}</h4>
            <div className="description">{quadrant.description}</div>
        </div>
    );
};

const Legend: React.FC = () => {
    return (
        <div className="radar-legend">
            <div className="wrapper">
                <span className="icon icon--blip_new"></span>
                New in this version
            </div>
            <div className="wrapper">
                <span className="icon icon--blip_changed"></span>
                Recently changed
            </div>
            <div className="wrapper">
                <span className="icon icon--blip_default"></span>
                Unchanged
            </div>
        </div>
    );
}

const RadarGrid: React.FC<
    {items: Item[]}
> = ({ items }) => {

    return (
        <div className="radar-grid">
            <RadarChart items={items} />
            {[...quadrantsMap.values()].map((value, index) => (
                <QuadrantLabel key={index} quadrant={value} />
            ))}
            <Legend />
        </div>
    );
}

export default RadarGrid;