import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

/* Client */
import Client from '../pages/Client';
import CreateClient from '../pages/CreateClient';
import UpdateClient from '../pages/UpdateClient';
import ListAllClients from '../pages/ListAllClients';
import ListContactsClients from '../pages/ListContactsClients';

import AddShowTelephones from '../pages/AddShowTelephones';
import AddTelephone from '../pages/AddTelephone';

/* Contact */
import Contact from '../pages/Contact';
import AddContact from '../pages/AddContact';
import UpdateContact from '../pages/UpdateContact';
import ListAllContacts from '../pages/ListAllContacts';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/clients-dashboard" component={Client} isPrivate />
    <Route path="/contacts-dashboard" component={Contact} isPrivate />

    {/* Clients */}
    <Route path="/create-client" component={CreateClient} isPrivate />
    <Route path="/edit-client/:id" component={UpdateClient} isPrivate />
    <Route path="/list-all-clients" component={ListAllClients} isPrivate />
    <Route path="/list-contacts-clients" component={ListContactsClients} isPrivate />

    {/* Telephones */}
    <Route path="/add-show-telephones/:id" component={AddShowTelephones} isPrivate />
    <Route path="/add-new-number" component={AddTelephone} isPrivate />

    {/* Contacts */}
    <Route path="/add-contact" component={AddContact} isPrivate />
    <Route path="/list-all-contacts" component={ListAllContacts} isPrivate />
    <Route path="/edit-contact/:id" component={UpdateContact} isPrivate />

  </Switch>
);

export default Routes;
