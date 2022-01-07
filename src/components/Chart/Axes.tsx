import React, { useRef, useLayoutEffect } from 'react';
import * as d3 from "d3";

export const YAxis: React.FC<{
    scale: d3.ScaleLinear<number, number>
}> = ({ scale }) => {

    const ref = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        if (ref.current == null) {
            return
        }
        const axisGenerator = d3.axisLeft(scale).ticks(6);
        d3.select(ref.current)
            .attr('class', 'y-axis')
            .call(axisGenerator)
            .call(g => g.selectAll('.tick text').remove())
            .call(g => g.selectAll('.tick line').remove())
            .call(g => g.selectAll('.domain').remove());
    }, [scale]);

    return <g ref={ref} />;
};

export const XAxis: React.FC<{
    scale: d3.ScaleLinear<number, number>
}> = ({ scale }) => {

    const ref = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
        if (ref.current == null) {
            return
        }
        const axisGenerator = d3.axisBottom(scale).ticks(6);
        d3.select(ref.current)
            .attr('class', 'x-axis')
            .call(axisGenerator)
            .call(g => g.selectAll('.tick text').remove())
            .call(g => g.selectAll('.tick line').remove())
            .call(g => g.selectAll('.domain').remove());
    }, [scale]);

    return <g ref={ref} />;
};
