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
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'HomeCtrl'
      })
      .when('/design', {
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux', {
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux/:name', {
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'ProjectsCtrl'
      })
      .otherwise({
        //redirectTo: '/'
        template: "doesn't exist",
        controller: function ($scope, $route, $location) {
          var path = $location.path(),
              parts = path.split("/"),
              admin = parts[1];
          //best I got for going to the admin menu for now...
          if (admin === 'admin') {
            window.location.reload();
          } else {
            //$location.path('/');
          }
        }
      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  } ]);


})(bootstrap);