import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import CreateClient from '../pages/CreateClient';
import ListAllClients from '../pages/ListAllClients';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/create-client" component={CreateClient} isPrivate />
    <Route path="/list-all-clients" component={ListAllClients} isPrivate />
  </Switch>
);

export default Routes;
