import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
    </Switch>
  )
}

export default Routes;