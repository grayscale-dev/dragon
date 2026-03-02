'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      webpack: {
        node: {
          global: false
        }
      }
    },
    'ember-cli-htmlbars': {
      isComponent(tagName) {
        if (tagName.startsWith('dui-')) {
          return false;
        }
        return undefined;
      }
    }
  });

  return app.toTree();
};
