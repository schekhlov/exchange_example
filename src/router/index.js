import React, { Fragment, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';

class Router extends Component {

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }

}

export default Router;
