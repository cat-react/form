import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Home from './Home';
import Login from './Login';
import Registration from './Registration';

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
        text: 'Login',
        description: ' (Dynamic submit button)'
    },
    {
        path: '/registration',
        component: Registration,
        text: 'Registration'
    }
];

class App extends React.Component {
    render() {
        const currentEntry = menuEntries.find((entry) => entry.path === window.location.hash.replace('#', ''));

        return (
            <div>
                <div className="col-md-2 sidebar">
                    <div className="list-group">
                        <span className="list-group-item">
                            <a href="https://github.com/cat-react/form"><b>@cat-react/form</b></a> Examples
                        </span>
                        {menuEntries.map((entry, index) => {
                            const replace = entry.path === window.location.hash.replace('#', '');
                            return <span key={index} className="list-group-item">
                                <Link className="nav-link" to={entry.path} replace={replace}>{entry.text}</Link>
                                {entry.description}
                            </span>;
                        })}
                    </div>
                </div>
                <div className="col-md-10 main">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Examples</li>
                        <li className="breadcrumb-item active">
                            <a href={'#' + currentEntry.path}>{currentEntry.text}</a>
                        </li>
                    </ol>
                    <Switch>
                        {menuEntries.map((entry, index) => {
                            return <Route key={index} exact={!!entry.exact} path={entry.path}
                                          component={entry.component}/>;
                        })}
                    </Switch>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root')
);
