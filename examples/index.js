import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';

import Home from './Home';
import Login from './Login';

ReactDOM.render(
    <HashRouter>
        <div>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            </nav>
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </main>
        </div>
    </HashRouter>,
    document.getElementById('root')
);
