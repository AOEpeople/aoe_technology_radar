import React from 'react';
import HeroHeadline from './HeroHeadline';
import Fadeable from './Fadeable';
import SetTitle from './SetTitle';

export default function PageToolbox({ leaving, onLeave, ...props }) {
  return (
    <Fadeable leaving={leaving} onLeave={onLeave}>
      <SetTitle {...props} title="Small AOE Toolbox" />
      <HeroHeadline>Small AOE Toolbox</HeroHeadline>
      <div className="fullpage-content">
        <h3>Useful Tools</h3>

        <ul>
          <li>Fiddler - free web debugging proxy ( http://www.telerik.com/fiddler )</li>
          <li>SoapUI - Webservice Test Tool (https://www.soapui.org/ )</li>
          <li>Postman - API Test Tool ( https://www.getpostman.com/ )</li>
          <li> Modelio  - Simple free UML Modelling tool ( https://www.modelio.org/ )</li>
        </ul>
        
        <h3>Useful Tools (commercial)</h3>

        <ul>
          <li> Paw Rest Client</li>
        </ul>


        <h3>Estabilshed Technologies</h3>
        <p>
          Not mentionable but adopted for a while now:
        </p>
        <ul>
          <li>Jenkins</li>
          <li>Redis</li>
          <li>Varnish</li>
          <li>Symfony2</li>
        </ul>
      </div>
    </Fadeable>
  );
}
