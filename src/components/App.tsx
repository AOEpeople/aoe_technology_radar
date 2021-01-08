import React  from 'react';
import classNames from 'classnames';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Router from './Router';
import {BrowserRouter, Switch, Route, Redirect, useParams, useLocation} from 'react-router-dom';
import { Item } from '../model';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const RouterWithPageParam = ({items, releases}: {items: Item[], releases: string[]}) => {
  const { page } = useParams();
  const query = useQuery();

  return <Router pageName={page} search={query.get('search') || ''} items={items} releases={releases}/>;
};

export default function App({items, releases}: {items: Item[], releases: string[]}) {
  return (
    <BrowserRouter>
      <div>
        <div className='page'>
          <div className='page__header'>
            <Header pageName='a' />
          </div>
          <div className={classNames('page__content')}>
            <Switch>
              <Route path={'/techradar/:page(.+).html'}>
                <RouterWithPageParam items={items} releases={releases} />
              </Route>
              <Route path={'/'}>
                <Redirect to={'/techradar/index.html'} />
              </Route>
            </Switch>
          </div>
          <div className='page__footer'>
            <Footer items={items} pageName='a' />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
