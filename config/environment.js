/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'vanilla-bean',
    podModulePrefix: 'vanilla-bean/pods',
    environment: environment,
    firebase: 'https://pecan.firebaseio.com/',
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
    },

    contentSecurityPolicy: {
      'connect-src': "'self' https://api.parse.com",
      'font-src': "'self' https://fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'img-src': "'self' data: http://files.parsetfss.com",
      'child-src': "'self'"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
