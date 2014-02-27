module.exports = function(config){
    config.set({
    basePath : '../../',

    files : [
      'public/lib/angular.js',
      'public/lib/angular-*.js',
      'public/lib/ui-bootstrap-tpls-0.7.0.js',
      'public/lib/underscore.js',
      'public/js/**/*.js',      
      'test/lib/angular/angular-mocks.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    proxies: {
      '/lib/d3.v3.js': 'http://localhost:3000/lib/d3.v3.js'
    },    

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

})}
