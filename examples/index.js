import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Login from './Login';

const menuEntries = [
    {
        exact: true,
        path: '/',
        component: Home,
        text: 'Home'
    },
    {
        path: '/login',
        component: Login,
        text: 'Login'
    }
];

ReactDOM.render(
    <HashRouter>
        <div>
            <nav>
                <ul>
                    {menuEntries.map((entry, index) => {
                        let replace = entry.path === window.location.hash.replace('#', '');
                        return <li key={index}><Link to={entry.path} replace={replace}>{entry.text}</Link></li>;
                    })}
                </ul>
            </nav>
            <main>
                <Switch>
                    {menuEntries.map((entry, index) => {
                        return <Route key={index} exact={!!entry.exact} path={entry.path} component={entry.component}/>;
                    })}
                </Switch>
            </main>
        </div>
    </HashRouter>,
    document.getElementById('root')
);
