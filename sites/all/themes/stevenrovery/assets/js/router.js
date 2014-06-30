(function (bs) {

  var app = angular.module('app-router', []);

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
            console.log("not admin just a wrong url...");
          }
        }
      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  } ]);


})(bootstrap);