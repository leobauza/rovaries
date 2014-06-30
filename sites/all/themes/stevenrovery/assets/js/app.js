(function (bs) {

  var app = angular.module('app', [
    'ngRoute',
    'app-router'
  ]);

  /**
   * Top Level Controller
   */
  app.controller('MainCtrl',
  ['$http', '$scope', '$location',
  function ($http, $scope, $location) {

    $scope.links = bs.menu.links;
    $scope.page = bs.node;

    //map the paths to the nids for the API calls
    $scope.nidsMap = {};
    for (key in $scope.links) {
      $scope.nidsMap[$scope.links[key].path] = $scope.links[key].nid;
    }

  } ]);


  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', '$http', '$route', '$location',
  function ($scope, $http, $route, $location) {

    var nid = $scope.nidsMap[$location.path()];
    $http.get('/api/page/' + nid).success(function (data) {
      $scope.page = data.node;
      $scope.outputHtml = "<h1>" + $scope.page.title + "</h1>" + $scope.page.body.safe_value;
    });

  } ]);

  /**
   * Philosophy Controller
   */
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
      controller: ['$location', '$scope', function ($location, $scope) {
        $scope.changePage = function (node, path) {
          $location.path(path);
          ($scope.page)? $scope.page = $scope.page : $scope.page = {};
          $scope.page.nid = node;
        }
      }]
    }
  });


  app.filter('unsafe', function ($sce) {
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  });

})(bootstrap);
