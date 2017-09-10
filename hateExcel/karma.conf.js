// Karma configuration
// Generated on Sun Sep 10 2017 12:41:49 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','fixture'],


    // list of files / patterns to load in the browser
    files: [
      "public/js/lib/*.js",
      "public/js/data.js",
      "public/js/lib/util.js",
      "public/js/class/Controller.js",
      "public/js/class/Model.js",
      "public/js/class/Page.js",
      "public/js/model/model.home.serverTable.js",
      "public/js/model/model.user.memos.js",
      "public/js/model/model.user.base.js",
      "public/js/view/view.edit.user.js",
      "public/js/view/view.kids.js",
      "views/index.ejs",
      "public/html/*.html",
      "public/template/*.html",
      "test/fixtures/**/*.html",
      'test/unit/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "views/index.ejs" : "html2js",
      "public/html/*.html" : "html2js",
      "public/template/*.html" : "html2js",
      "public/js/class/*.js" : ['coverage'],
      "public/js/model/*.js" : ['coverage'],
      "public/js/view/*.js" : ['coverage'],
      "public/js/*.js" : ['coverage'],
      "test/fixtures/*.html": "html2js",
      "test/fixtures/server/*.js": ['webpack', 'sourcemap'],
      'test/unit/*.js': ['webpack','sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
              plugins: ['babel-plugin-espower']
            }
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ],
        postLoaders: [
          {
            test: /\.js$/,
            exclude: /(test|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec','coverage'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


    coverageReporter: {
      dir: 'coverage',
      reporters: [
          { type: 'html' },
          { type: 'text' },
          { type: 'text-summary'},
      ]
    }

  })
}
