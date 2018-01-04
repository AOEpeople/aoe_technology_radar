import React from 'react';
import * as d3 from 'd3';
import * as d3tip from 'd3-tip';
import {withFauxDOM} from 'react-faux-dom';
import * as model from '../../common/model';
import {Chance} from 'chance';
import { isNull } from 'util';
import actions from '../actions';
import { connect } from 'react-redux';

class RadarChart extends React.Component {
  
  availableRings = [
    {'name': 'scale', 'order': 0},
    {'name': 'productize', 'order': 1},
    {'name': 'discover', 'order': 2}
  ];

  availableQuadrants = [
    {'name': 'data-science-and-analytics', 'label': 'Data science & analytics', 'order': 'first', 'startAngle': 90},
    {'name': 'infrastructure-and-operational-technology', 'label': 'Infrastructure & Operational Technology' ,'order': 'second', 'startAngle': 0},
    {'name': 'platforms-and-partners', 'label': 'Platforms & Partners', 'order': 'third', 'startAngle': -90},
    {'name': 'ui-and-devices', 'label': 'Ui & Devices', 'order': 'fourth', 'startAngle': -180}
  ];

  componentDidMount () {

    const size = 620;

    const faux = this.props.connectFauxDOM('div', 'chart');
    var svg = d3.select(faux)
      .append('svg')
      .attr('id', 'radar-plot')
      .attr('width', size)
      .attr('height', size);

    const getAggregatedDataGroupedByRing = (data) => {
    
      let groupedItems = model.groupByRing(data);
  
      var chartDataByRing = {};
  
      for (const ringName in groupedItems) {
        if (ringName !== null && ringName !== undefined) {
          chartDataByRing[ringName] = assembleFlatChartItemsForRing(groupedItems[ringName]);
        }    
      }
      return chartDataByRing;
  
    }

    const assembleFlatChartItemsForRing = (ringData) => {
      var chartItems = [];
      if (ringData === null || ringData === undefined) {
        return chartItems;
      }

      ringData.forEach(function(articleData, i){
        chartItems.push(transformToChartItem(articleData));
      });

      return chartItems;
    }
    
    const transformToChartItem = (articleData) => {
  
      return {
        'quadrant': articleData.quadrant,
        'ring': articleData.ring, 
        'label': articleData.title,
        'isNew': articleData.isNew,
        'width': 24,
        'detailLink': articleData.quadrant + '/' + articleData.name
      };
  
    }

    const center = () => {
      return Math.round(size / 2);
    }
  
    const toRadian = (angleInDegrees) => {
      return Math.PI * angleInDegrees / 180;
    }

    const getSum = (length) => {
      const sequence = [0, 18, 8, 6, 2, 1, 1, 1];
      return sequence.slice(0, length + 1).reduce(function (previous, current) {
        return previous + current;
      }, 0);
    }
  
    const getRadiusOfRing = (currentRingNumber) => {
      
      const totalNumberOfRings = this.availableRings.length;
      const maxRadius = center();
      const total = getSum(totalNumberOfRings);
      const sum = getSum(currentRingNumber);
      return maxRadius * sum / total;
    }

    const plotQuadrant = (quadrant) => {
      var quadrantGroup = svg.append('g')
        .attr('class', 'quadrant-group quadrant-group-' + quadrant.order)
  
      this.availableRings.forEach(function (ring, i) {
        var arc = d3.arc()
          .innerRadius(getRadiusOfRing(i))
          .outerRadius(getRadiusOfRing(i + 1))
          .startAngle(toRadian(quadrant.startAngle))
          .endAngle(toRadian(quadrant.startAngle - 90));
  
        quadrantGroup.append('path')
          .attr('d', arc)
          .attr('class', 'ring-arc-' + ring.order)
          .attr('transform', 'translate(' + center() + ', ' + center() + ')');
      });

      return quadrantGroup;
    }

    const plotLines = (quadrantGroup, quadrant) => {
      const startX = size * (1 - (-Math.sin(toRadian(quadrant.startAngle)) + 1) / 2);
      const endX = size * (1 - (-Math.sin(toRadian(quadrant.startAngle - 90)) + 1) / 2);
  
      let startY = size * (1 - (Math.cos(toRadian(quadrant.startAngle)) + 1) / 2);
      let endY = size * (1 - (Math.cos(toRadian(quadrant.startAngle - 90)) + 1) / 2);
  
      if (startY > endY) {
        const aux = endY;
        endY = startY;
        startY = aux;
      }
  
      quadrantGroup.append('line')
        .attr('x1', center()).attr('x2', center())
        .attr('y1', startY - 2).attr('y2', endY + 2)
        .attr('stroke-width', 10);
  
      quadrantGroup.append('line')
        .attr('x1', endX).attr('y1', center())
        .attr('x2', startX).attr('y2', center())
        .attr('stroke-width', 10);
    }
   
    const plotTexts = (quadrantGroup, quadrant) => {
      this.availableRings.forEach(function (ring, i) {
        const p1 = getRadiusOfRing(i);
        const p2 = getRadiusOfRing(i + 1);
        const modificator = (p1 + p2) / 2;
        if (quadrant.order === 'first' || quadrant.order === 'fourth') {
          quadrantGroup.append('text')
            .attr('class', 'line-text')
            .attr('y', center() + 4)
            .attr('x', center() + modificator)
            .attr('text-anchor', 'middle')
            .text(ring.name);
        } else {
          quadrantGroup.append('text')
            .attr('class', 'line-text')
            .attr('y', center() + 4)
            .attr('x', center() - modificator)
            .attr('text-anchor', 'middle')
            .text(ring.name);
        }
      });
    }

    const getStartAngleByQuadrantName = (quadrantName) => {
      this.availableQuadrants.forEach(function(availableQuadrant){
        if(availableQuadrant.name === quadrantName){
          return availableQuadrant.startAngle;
        }
      });
    }

    const calculateItemCoordinates = (item, chance, minRadius, maxRadius, startAngle) => {
      
      var adjustX = Math.sin(toRadian(startAngle)) - Math.cos(toRadian(startAngle));
      var adjustY = -Math.cos(toRadian(startAngle)) - Math.sin(toRadian(startAngle));
  
      var radius = chance.floating({min: minRadius + item.width / 2, max: maxRadius - item.width / 2});
      var angleDelta = Math.asin(item.width / 2 / radius) * 180 / Math.PI;
      angleDelta = angleDelta > 45 ? 45 : angleDelta;
      var angle = toRadian(chance.integer({min: angleDelta, max: 90 - angleDelta}));
  
      var x = center() + radius * Math.cos(angle) * adjustX;
      var y = center() + radius * Math.sin(angle) * adjustY;
  
      return [x, y];
    }

    const thereIsCollision = (item, coordinates, allCoordinates) => {
      return allCoordinates.some(function (currentCoordinates) {
        return (Math.abs(currentCoordinates[0] - coordinates[0]) < item.width) && (Math.abs(currentCoordinates[1] - coordinates[1]) < item.width)
      });
    }

    const findItemCoordinates = (item, minRadius, maxRadius, startAngle, allItemCoordinatesInRing, chance) => {
      const maxIterations = 200;
      var coordinates = calculateItemCoordinates(item, chance, minRadius, maxRadius, startAngle);
      var iterationCounter = 0;
      var foundAPlace = false;
      var MIN_ITEM_WIDTH = 12;
  
      while (iterationCounter < maxIterations) {
        if (thereIsCollision(item, coordinates, allItemCoordinatesInRing)) {
          coordinates = calculateItemCoordinates(item, chance, minRadius, maxRadius, startAngle);
        } else {
          foundAPlace = true;
          break;
        }
        iterationCounter++;
      }
  
      if (!foundAPlace && item.width > MIN_ITEM_WIDTH) {
        item.width = item.width - 1;
        return findItemCoordinates(item, minRadius, maxRadius, startAngle, allItemCoordinatesInRing, chance);
      } else {
        return coordinates;
      }
    }

    const plotItems = (quadrantGroup, quadrant) => {
      let aggregated = getAggregatedDataGroupedByRing(this.props.items);
      let order = quadrant.order;
      let startAngle = quadrant.startAngle;
      this.availableRings.forEach(function(availableRing, i){
        let itemsInRing = aggregated[availableRing.name];
        if (itemsInRing !== undefined && itemsInRing !== null) {
          const minRadius = getRadiusOfRing(i);
          const maxRadius = getRadiusOfRing(i + 1);

          var sumRing = availableRing.name.split('').reduce(function (p, c) {
            return p + c.charCodeAt(0);
          }, 0);
          var sumQuadrant = quadrant.name.split('').reduce(function (p, c) {
            return p + c.charCodeAt(0);
          }, 0);
          var chance = new Chance(Math.PI * sumRing * availableRing.name.length * sumQuadrant * quadrant.name.length);
         
          var allItemCoordinatesInRing = [];
         
          itemsInRing.forEach(function(itemInRing, i){ 
            if (itemInRing.quadrant === quadrant.name) {
              const coordinates = findItemCoordinates(itemInRing, minRadius, maxRadius, startAngle, allItemCoordinatesInRing, chance);  
              allItemCoordinatesInRing.push(coordinates);
              drawItemInCoordinates(itemInRing, coordinates, order, quadrantGroup);
            }
          });
        }
      });
    }

    const triangle = (item, x, y, order, group) => {
      return group.append('path').attr('d', "M412.201,311.406c0.021,0,0.042,0,0.063,0c0.067,0,0.135,0,0.201,0c4.052,0,6.106-0.051,8.168-0.102c2.053-0.051,4.115-0.102,8.176-0.102h0.103c6.976-0.183,10.227-5.306,6.306-11.53c-3.988-6.121-4.97-5.407-8.598-11.224c-1.631-3.008-3.872-4.577-6.179-4.577c-2.276,0-4.613,1.528-6.48,4.699c-3.578,6.077-3.26,6.014-7.306,11.723C402.598,306.067,405.426,311.406,412.201,311.406")
        .attr('transform', 'scale(' + (item.width / 34) + ') translate(' + (-404 + x * (34 / item.width) - 17) + ', ' + (-282 + y * (34 / item.width) - 17) + ')')
        .attr('class', order);
    }

    const circle = (item, x, y, order, group) => {
      return (group || svg).append('path')
        .attr('d', "M420.084,282.092c-1.073,0-2.16,0.103-3.243,0.313c-6.912,1.345-13.188,8.587-11.423,16.874c1.732,8.141,8.632,13.711,17.806,13.711c0.025,0,0.052,0,0.074-0.003c0.551-0.025,1.395-0.011,2.225-0.109c4.404-0.534,8.148-2.218,10.069-6.487c1.747-3.886,2.114-7.993,0.913-12.118C434.379,286.944,427.494,282.092,420.084,282.092")
        .attr('transform', 'scale(' + (item.width / 34) + ') translate(' + (-404 + x * (34 / item.width) - 17) + ', ' + (-282 + y * (34 / item.width) - 17) + ')')
        .attr('class', order);
    }

    const drawItemInCoordinates = (item, coordinates, order, quadrantGroup) => {
      var x = coordinates[0];
      var y = coordinates[1];
  
      var group = quadrantGroup.append('g').attr('class', 'blip-link').on('click', this.props.handleClick.bind({}, item.detailLink));
  
      if (item.isNew) {
        triangle(item, x, y, order, group);
      } else {
        circle(item, x, y, order, group);
      }
  
      group.append('text')
        .attr('x', x)
        .attr('y', y + 4)
        .attr('class', 'blip-text')
        // derive font-size from current item width
        .style('font-size', ((item.width * 10) / 22) + 'px')
        .attr('text-anchor', 'middle')
        .text(item.label);  
     
    }

    
    this.availableQuadrants.forEach(function(quadrant){
      let quadrantGroup = plotQuadrant(quadrant);
      plotLines(quadrantGroup, quadrant);
      plotTexts(quadrantGroup, quadrant);
      plotItems(quadrantGroup, quadrant);

    });
    

    this.props.animateFauxDOM(800);
    
  }

  render () {
    return (
      <div className='renderedD3' id='radar'>
        {this.props.chart}
        <div id='legend'>{this.availableQuadrants.map((quadrant, i) => <div className={`button ${quadrant.order} full-view`} key={i}>{quadrant.label}</div>)}</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: detailLink => {
      dispatch(actions.navigate(detailLink))
    }
  }
}

RadarChart.defaultProps = {
  chart: 'loading'
}

export default connect(
  undefined,
  mapDispatchToProps
)(withFauxDOM(RadarChart))