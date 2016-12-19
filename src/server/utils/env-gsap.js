global.document = {
  createElement: function () {
    return {style: {}};
  },
  createEvent: function () {
    return {};
  },
  querySelector: function () {
    return {};
  },
  getElementsByTagName: function () {
    return {};
  }
};

global.navigator = {
  'userAgent': ''
};

global.window = {
  Event: {
    prototype: {}
  }
};
