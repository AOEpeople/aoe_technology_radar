import React from 'react';
import classNames from 'classnames';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Router from './Router';
import {BrowserRouter, Switch, Route, Redirect, useParams, useLocation} from 'react-router-dom';
import {Item} from '../model';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const RouterWithPageParam = ({items, releases}: { items: Item[], releases: string[] }) => {
    const {page} = useParams();
    const query = useQuery();

    return <Router pageName={page} search={query.get('search') || ''} items={items} releases={releases}/>;
};

const HeaderWithPageParam = () => {
    const {page} = useParams();

    return <Header pageName={page}/>
};

const FooterWithPageParam = ({items}: { items: Item[]}) => {
    const {page} = useParams();

    return <Footer pageName={page} items={items}/>
};

export default function App({items, releases}: { items: Item[], releases: string[] }) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/techradar/:page(.+).html'}>
                    <div>
                        <div className='page'>
                            <div className='page__header'>
                                <HeaderWithPageParam/>
                            </div>
                            <div className={classNames('page__content')}>
                                <RouterWithPageParam items={items} releases={releases}/>
                            </div>
                            <div className='page__footer'>
                                <FooterWithPageParam items={items}/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path={'/'}>
                    <Redirect to={'/techradar/index.html'}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
