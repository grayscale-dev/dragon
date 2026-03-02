'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'ember-tests',
    environment,
    rootURL: '/',
    locationType: 'none',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: false
    },
    APP: {}
  };

  if (environment === 'test') {
    ENV.APP.autoboot = false;
  }

  return ENV;
};
