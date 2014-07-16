(function (bs) {

  var app = angular.module('app');

  app.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: bs.tplsPath + '/home.html',
        controller: 'HomeCtrl'
      })
      .when('/philosophy', {
        templateUrl: bs.tplsPath + '/philosophy.html',
        controller: 'PhilCtrl'
      })
      .when('/philosophy/:name', {
        templateUrl: bs.tplsPath + '/philosophy.html',
        controller: 'PhilCtrl'
      })
      .when('/resume', {
        templateUrl: bs.tplsPath + '/resume.html',
        controller: 'ResumeCtrl'
      })
      .when('/design', {
        templateUrl: bs.tplsPath + '/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux', {
        templateUrl: bs.tplsPath + '/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux/:name', {
        templateUrl: bs.tplsPath + '/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/design/:name', {
        templateUrl: bs.tplsPath + '/project.html',
        controller: 'ProjectCtrl'
      })
      .otherwise({

        template: "doesn't exist"

      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  } ]);

  app.run(['$rootScope', '$location', '$window',
  function ($rootScope, $location, $window) {

    $rootScope.$on('$locationChangeStart', function (event, next) {

      var parts = next.split('/');
      //handle admin route
      if (_.contains(parts, 'admin') || _.contains(parts, 'admin_menu')) {
        $window.location.href = next;
      }

    });


  }]);


})(bootstrap);