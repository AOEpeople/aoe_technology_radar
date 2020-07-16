import React, { useState } from 'react';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import Router from './Router';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';

import radardata from '../rd.json'
import { Item } from '../model';

const A = () => {
  const {page} = useParams()
  return <Router pageName={page} items={radardata.items as Item[]} releases={radardata.releases as string[]}></Router>
}

export default function App() {
  const [isFaded] = useState(false)

  return (
    <BrowserRouter>
      <div>
        <div className="page">
          <div className="page__header">
            <Header pageName="a" />
          </div>
          <div
            className={classNames('page__content', { 'is-faded': isFaded })}
          >
            <Switch>
              <Route path={"/techradar/:page(.+).html"}>
                <A/>
              </Route>
              <Route path={"/"}>
                <Redirect to={"/techradar/index.html"}/>
              </Route>
            </Switch>
          </div>
          <div className="page__footer">
            <Footer items={radardata.items as Item[]} pageName="a" />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
