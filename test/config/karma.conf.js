module.exports = function(config){
    config.set({
    basePath : '../../',

    files : [
      'public/lib/angular.js',
      'public/lib/angular-*.js',
      'public/lib/ui-bootstrap-tpls-0.7.0.js',
      'public/lib/underscore.js',
      'public/lib/d3.v3.js',
      'public/js/**/*.js',      
      'test/lib/angular/angular-mocks.js',
      'test/unit/angular/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

})}
