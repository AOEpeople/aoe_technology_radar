// TODO remove faux-dom and start using the React hook approach
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";

export const YAxis = ({ scale }) => {
    const el = ReactFauxDOM.createElement('g');

    const axisGenerator = d3.axisLeft(scale).ticks(6);

    d3.select(el).attr('class', 'y-axis')
      .call(axisGenerator)
      .call(g => g.selectAll('.tick text').remove())
      .call(g => g.selectAll('.tick line').remove())
      .call(g => g.selectAll('.domain').remove());
    return el.toReact();
};

export const XAxis = ({ scale }) => {
    const el = ReactFauxDOM.createElement('g');

    const axisGenerator = d3.axisBottom(scale).ticks(6);
    d3.select(el).attr('class', 'x-axis')
        .call(axisGenerator)
        .call(g => g.selectAll('.tick text').remove())
        .call(g => g.selectAll('.tick line').remove())
        .call(g => g.selectAll('.domain').remove());

    return el.toReact();
};