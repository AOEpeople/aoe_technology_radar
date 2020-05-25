import React from 'react';
import HeroHeadline from './HeroHeadline';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';
import { radarName } from '../../common/config';

export default function PageHelp({ leaving, onLeave, ...props }) {
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title={ "How to use the " + radarName } />
      <HeroHeadline>How to use the {radarName}</HeroHeadline>
      <div className="fullpage-content">
        <h3>Introduction</h3>
        <p>Technology is moving fast and new technologies and innovations appear continuously.</p>
        <p>It's essential for a development and technology company such as AOE to constantly improve and keep track with the latest useful innovations.
        It is important to openly look for innovations and new technologies and to question established technologies and methods every now and then.</p>
        <p>But, it is also important to wisely choose which technologies to use in our daily work and in the different projects we are carrying out. As we all know: There is no silver bullet.</p>
        <h3>What is the {radarName}</h3>
        <p>The Tech Radar is an overview of different technologies - from languages, frameworks, tools and patterns to platforms - that we consider "new or mentionable".
          The radar therefore doesn't provide an overview of all established technologies - but it focuses on items that have recently gained in importance or changed.
        </p>
        <h3 >How it is created</h3><p>The items in the technology radar are raised by the different teams and therefore a lot of the items are related to the work and challenges the teams face in the different projects. In fact, we don't include anything on the radar, which we haven't already tried ourselves at least once.</p>
        <p>There have been a lot of valuable discussions in different expert groups about the classification and details of each of technologies and innovations. And the result of all this can be found in the latest technology radar.</p>
        <h3 >How should it be used</h3>
        <p>The radar acts as an overview of technologies that we think everyone in the teams should currently know about.</p>
        <p>Its goal is to act as a guide and inspiration for the daily work in the teams. Its purpose is also to provide helpful information and a bird's-eye perspective - so that decisions can be taken with a much deeper understanding of the subject matter. This results in more-informed and better-aligned decisions.</p>
        <p>We also hope that developers outside of AOE find the informations in our technologie overview inspirational.</p>
        <p>We group or categorize the items in 4 quadrants - (sometimes, when it's not 100% clear where a item belongs, we choose the best fit).</p>
        <p>The quadrants are:</p>
        <ul>
          <li><strong>Languages and Frameworks:</strong> We've placed development languages (such as Scala or Golang) here, as well as more low-level development frameworks (such as Play or Symfony), which are useful for implementing custom software of all kinds. </li>
          <li><strong>Tools:</strong> Here we put different software tools - from small helpers to bigger software projects</li>
          <li><strong>Methods and Patterns:</strong> Patterns are so important, and a lot of them are valid for a long time (compared to some tools or frameworks). So, this is the category where we put information on methods and patterns concerning development, continuous x, testing, organization, architecture, etc.</li>
          <li><strong>Platforms and Services</strong> (including AOE internal Services): Here we include infrastructure platforms and services. We also use this category to communicate news about AOE services that we want all AOE teams to be aware of.</li>
        </ul>
        <p>Each of the items is classified in one of these rings:</p>
        <ul>
          <li><strong>Adopt:</strong> We can clearly recommend this technology. We have used it for longer period of time in many teams and it has proven to be stable and useful.</li>
          <li><strong>Trial:</strong> We have used it with success and recommend to have a closer look at the technology in this ring. The goal of items here is to look at them more closely, with the goal to bring them to the adopt level.</li>
          <li><strong>Assess:</strong> We have tried it out and we find it promising. We recommend having a look at these items when you face a specific need for the technology in your project.</li>
          <li><strong>Hold:</strong> This category is a bit special. Unlike the others, we recommend to stop doing or using something. That does not mean that there are bad and it often might be ok to use them in existing projects. But we move things here if we think we shouldn't do them anymore - because we see better options or alternatives now.</li>
        </ul>
      <p>Contributions and source code of the radar are on github: <a href="https://github.com/AOEpeople/aoe_technology_radar" target="_blank">AOE Tech Radar on Github</a></p>


      </div>
    </Fadeable>
  );
}
