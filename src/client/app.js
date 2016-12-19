import 'babel-polyfill';
import React from 'react';
import Relay from 'react-relay';
import {RelayNetworkLayer, urlMiddleware, authMiddleware, loggerMiddleware,
  perfMiddleware, gqErrorsMiddleware} from 'react-relay-network-layer';
import {Router, browserHistory} from 'react-router';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="site">
        <header className="site-header" role="banner">
          Header
        </header>
        <main id="main" className="site-body" role="main">
          {this.props.children}
        </main>
      </div>
    );
  }
}
