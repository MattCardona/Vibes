import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Layout from './hoc/Layout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </Layout>
  )
}

export default Routes;