import React from 'react';
import {render} from 'react-dom';
import {Router, applyRouterMiddleware, browserHistory} from 'react-router';
import { useScroll } from 'react-router-scroll';
import routes from '~/src/shared/routes';
import 'whatwg-fetch';

import EventEmitter from 'wolfy87-eventemitter';

window.EVENT_EMITTER = new EventEmitter();

render((
  <div>
    <Router
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </div>
), document.getElementById('app'));
