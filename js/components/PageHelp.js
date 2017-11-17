import React from 'react';
import HeroHeadline from './HeroHeadline';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';

export default function PageHelp({ leaving, onLeave, ...props }) {
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title="How to use Haufe Technology Radar" />
      <HeroHeadline>How to use Haufe Technology Radar</HeroHeadline>
      <div className="fullpage-content">
        <h3>Introduction</h3>
        <p>Technology gets more and more important for each company and especially for software vendors.<br/>
        The Haufe Group is considered one of the most innovative media and software vendors in Germany. Its solutions use state-of-the-art technology and are very user-friendly and practice-oriented.<br/>
        It's essential for our business to constantly keep track on new technologies and useful innovations.
        Not each technology fits to our requirements and strategy. It's important to choose them wisely.</p>
        <h3>What is the Haufe Tech Radar</h3>
        <p>The Tech Radar is an overview of different technologies and innovations that are important for our business.
          The radar doesn't provide an overview of all technologies - but it focuses on technologies and innovations that have or might have business impact on our strategy.
          It's goal is to reflect our maturity state and experience with these technologies.
        </p>
        <h3 >How it is created</h3>
        <p>The items in the technology radar are maintained by the innovation team.<br/>
        It's always a hard discussion about the classification and details of each technology and innovation. Please contribute to the discussion. It is the tech radar of our company and not from a single group.</p>
        <h3 >How should it be used</h3>
        <p>The radar acts as an overview of technologies that we think everyone in the company should currently know about.
        Its purpose is to provide helpful information and a bird's-eye perspective. It informs about our initiatives in these areas and hopefully helps to get in contact with other teams for experience exchange and collaboration.
        It also helps to have an overview over our own maturity state with diferent technologies.</p>
        <p>We group or categorize the items in 4 quadrants - (sometimes, when it's not 100% clear where a item belongs, we choose the best fit).</p>
        <p>The quadrants are:</p>
        <ul>
          <li><strong>Data Science & Analytics:</strong> All data related technologies and trends like BigData, Business Intelligence, Artifical Intelligence (AI,KI) and Machine Learning are placed here.</li>
          <li><strong>Infrastructure & Operational Technology:</strong> Technologies reaching from Cloud over DevOps, Containerization, Continous Integration/Delivery/Deployment, Build Pipelines, Monitoring, Logging</li>
          <li><strong>Platform & Partners:</strong> Technologies useful for product/system collaboration and composable new product forms like APIs, API Management, Partner Platform, Collaboration, Integration </li>
          <li><strong>UI & Devices</strong> New forms of user interfaces like voice (Amazon Alexa), Chatbots, Virtual/Artifical/Mixed reality devices, Mobile devices and also other IoT devices including Smart Home</li>
        </ul>
        <p>Each of the items is classified in one of these rings:</p>
        <ul>
          <li><strong>Discover:</strong> We discover the value of a technology and proof the value for us and our customers. That is typically the stage were we work on PoCs and unrisky tests in apps. </li>
          <li><strong>Productize:</strong> We use it in one or a small amount of products and gather experinece with our customers. </li>
          <li><strong>Scale:</strong> We use it in many products and teams and it has proven to be stable and useful. </li>
        </ul>
      <p>Contributions and source code of the radar are on github: <a href="https://github.com/Haufe-Lexware/aoe_technology_radar" target="_blank">Haufe Tech Radar on Github</a></p>
      <p>The solution is forked from the AOE Tech Radar <a href="" target="_blank">AOE Tech Radar on Github</a>. We like to thank that guys for their great work!</p>


      </div>
    </Fadeable>
  );
}
