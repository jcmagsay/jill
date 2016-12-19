module.exports = {
  'buildRoutes': function(route, path, tree) {
    if (typeof route !== 'object') {
      return tree;
    }
    // if it's an object we need to check each property
    for (let prop in route) {
      if (route[prop] !== null) {
        // for each property, check to see if it's an object.
        // if it's an object, and has a .path property, we're on a route
        if (typeof route[prop] === 'object') {
          // ignore the wildcard && and dynamic routes
          if (typeof route[prop].path !== 'undefined' && route[prop].path !== '*' && route[prop].path.indexOf(':') < 0) {
            // there is a path, and not a wildcard, store it
            // and clean up child routes of '/', as they get `//`
            path = (path += route[prop].path).replace('//', '/');
            tree[`${path}`] = ['get'];
            // pass possible child routes for a check
            this.buildRoutes(route[prop].children, path += '/', tree);
          } else {
            // no path property, must be another object, call for recursion
            this.buildRoutes(route[prop], path, tree);
          }
        }
      }
    }
    return tree;
  }
}
