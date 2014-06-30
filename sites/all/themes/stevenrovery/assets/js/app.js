(function (bs) {

  console.log(bs);

  var app = angular.module('app', [
    'ngRoute'
  ]);

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
          console.log('location', $location.path());

          //best I got for going to the admin menu for now...
          //window.location.reload();
        }
      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  } ]);

  app.controller('AppCtrl', ['$http', '$scope', '$location', function ($http, $scope, $location) {

    $scope.links = bs.menu.links;
    $scope.page = bs.node;
    $scope.nidsMap = {};

    for (key in $scope.links) {
      $scope.nidsMap[$scope.links[key].path] = $scope.links[key].nid;
    }

    console.log("page map?", $scope.nidsMap);

    $scope.changePage = function (node, path) {
      $scope.page.nid = node;
      $location.path(path);
    }

  } ]);


  app.controller('HomeCtrl',
  ['$scope', '$http', '$route', '$location',
  function ($scope, $http, $route, $location) {

    var nid = $scope.nidsMap[$location.path()];
    $http.get('/api/page/' + nid).success(function (data) {
      $scope.page = data.node;
      $scope.outputHtml = "<h1>" + $scope.page.title + "</h1>" + $scope.page.body.safe_value;
    });

  } ]);

  app.controller('PhilCtrl',
  ['$scope', '$http', '$route', '$location',
  function ($scope, $http, $route, $location) {

    var nid = $scope.nidsMap[$location.path()];
    $http.get('/api/page/' + nid).success(function (data) {
      $scope.page = data.node;
      $scope.outputHtml = "<h1>" + $scope.page.title + "</h1>" + $scope.page.body.safe_value;
    });

  } ]);

  /**
   * Global:
   * A global controller: navigation clicks and such??
   * Some global directives: nav element, header element, footer element?
   * Some global filters too as helpers
   */

  app.directive('siteNav', function () {
    return {
      restrict: 'E',
      templateUrl: bs.tplsPath + '/site-nav.html',
      controller: function () {
        //do stuff??
      }
    }
  });


  app.filter('unsafe', function ($sce) {
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  });

})(bootstrap);
