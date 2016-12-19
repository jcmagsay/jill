import newrelic from 'newrelic'; // always first
import '~/src/server/utils/env-gsap';
import express from 'express';
import redirect from 'express-redirect';
import register from 'ignore-styles';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import DocumentTitle from 'react-document-title';
import routes from '~/src/shared/routes';
import routesTree from '~/src/shared/routes-tree';
import map from 'express-sitemap';
import moment from 'moment';
import dotenv from 'dotenv';
import auth from 'http-auth';
import proxy from 'http-proxy-middleware';
import webpackConfig from '~/config/webpack.config';

function basicAuth() {
  if (process.env.IS_PASSWORD_PROTECTED === 'true') {
    const envUser = process.env.ENV_USER;
    const envPassword = process.env.ENV_PASSWORD;
    const basic = auth.basic({
      'realm': 'Protected'
    }, (username, password, callback) => {
      callback(username === envUser && password === envPassword);
    });
    app.use(auth.connect(basic));
  }
}

function sitemap() {
  // sitemap
  const sitemap = map({
    'url': process.env.SITE_URL,
    'route': {
      'ALL': {
        'lastmod': moment().format('YYYY-MM-DD'),
        'changefreq': 'always',
        'priority': 1
      }
    },
    'map': routesTree.buildRoutes(routes, '', {})
  });

  app.get('/sitemap.xml', function(request, response) {
    request.header('Content-Type', 'application/xml');
    sitemap.XMLtoWeb(response);
  });

  // robots.txt
  app.get('/robots.txt', function(request, response) {
    request.header('Content-Type', 'text/plain');
    sitemap.TXTtoWeb(response);
  });
}

function getAssetPath() {
  let protocol = (process.env.IS_SECURE === 'true') ? 'https://' : 'http://';
  let assetHostEnabled = (process.env.ASSET_HOST_ENABLED === 'true') ? true : false;
  let assetHost = process.env.ASSET_HOST;
  let assetPath = '/assets';

  if (assetHostEnabled) {
    assetPath = protocol + assetHost + assetPath;
  }
  return assetPath;
}

function getAssetVersion() {
  let asset_host_enabled = (process.env.ASSET_HOST_ENABLED === 'true') ? true : false;
  let asset_version = '';

  if (asset_host_enabled) {
    asset_version = '?v=' + (new Date).getTime();
  }
  return asset_version;
}

function matchRoutes(req, res) {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      // get the page title
      let page_title = DocumentTitle.rewind();
      let protocol = (process.env.IS_SECURE === 'true') ? 'https://' : 'http://';
      let asset_path = getAssetPath();
      let version = getAssetVersion();
      const markup = renderToString(<RouterContext {...props} />);

      // render `index.ejs`, but pass in the markup we want it to display
      res.render('index', {
        asset_path,
        version,
        protocol,
        page_title,
        newrelic,
        markup
      });
    } else {
      res.render('not-found');
    }
  });
}

function redirects() {
  app.redirect('/new-page/', '/');
}

// Read .env to properly set `process.env`
dotenv.config({
  'path': './.env'
});

const PORT = process.env.PORT || 8080;
const app = express();
register(['.sass', '.scss', '.svg']);
app.locals.newrelic = newrelic;
redirect(app);
app.use(express.static('public'));
app.set('views', './src/server/views');
app.set('view engine', 'ejs');

if (process.env.IS_SECURE === 'true') {
  app.use(forceSSL);
}

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    'noInfo': true,
    'publicPath': webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler, {
    'log': console.log,
    'heartbeat': 10 * 1000,
    'path': `/__webpack_hmr`
  }));
}

redirects();
basicAuth();
sitemap();

app.get('*', (req, res) => {
  matchRoutes(req, res);
});

app.listen(PORT, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  switch (process.env.NODE_ENV) {
    case 'production': {
      break;
    }
    default: {
      console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
      break;
    }
  }
});
