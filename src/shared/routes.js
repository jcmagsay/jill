import React from 'react';
import {Route, IndexRoute} from "react-router";

import App from '~/src/client/app'
import Home from '~/src/client/pages/home/home'
import NotFound from '~/src/client/pages/not-found';

/**
 * The React Router routes for both the server and the client.
 */
module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={NotFound} />
  </Route>
);
