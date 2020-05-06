import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GlobalStyles from './GlobalStyles';

import TestPage from '../../TestPage';

class App extends Component {
    render() {
        return (
            <>
                <GlobalStyles />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={TestPage} />
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
