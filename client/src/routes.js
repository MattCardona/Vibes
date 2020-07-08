import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Layout from './hoc/Layout';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/Register';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register_login" component={RegisterLogin} exact />
        <Route path="/register" component={Register} exact />
      </Switch>
    </Layout>
  )
}

export default Routes;