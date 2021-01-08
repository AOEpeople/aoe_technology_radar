import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';
import {Item} from "./model";
import radardata from './rd.json';

ReactDOM.render(
  <React.StrictMode>
    <App items={radardata.items as Item[]} releases={radardata.releases as string[]} />
  </React.StrictMode>,
  document.getElementById('root')
);
