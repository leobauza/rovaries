(function (bs) {

  var app = angular.module('app', [
    'ngRoute',
    'appRouter',
    'appServices'
  ]);

  /**
   * Top Level Controller
   */
  app.controller('MainCtrl',
  ['$scope', '$location',
  function ($scope, $location) {

    $scope.links = bs.menu.links;
    $scope.page = bs.node;
    $scope.page.nid = bs.node.nid;
    //map the paths to the nids for the API calls
    $scope.nidsMap = {};
    for (key in $scope.links) {
      $scope.nidsMap[$scope.links[key].path] = $scope.links[key].nid;
    }


  } ]);

  /**
   * Test Controller
   */
  app.controller('TestCtrl',
  ['$scope', '$location', 'Page', '$timeout',
  function ($scope, $location, Page, $timeout) {

    var nid = $scope.nidsMap[$location.path()];

    var page = Page.get({'nid':nid}, function () {
      $scope.page.nid = nid;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });

  } ]);


  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {

    var nid = $scope.nidsMap[$location.path()];

    var page = Page.get({'nid':nid}, function () {
      $scope.page.nid = nid;
      $scope.node = page.node;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });

  } ]);

  /**
   * Philosophy Controller
   */
  app.controller('PhilCtrl',
  ['$scope', '$location', '$routeParams', 'Page',
  function ($scope, $location, $routeParams, Page) {
    var location = $location.path(),
        splitLoc = location.split('/'),
        name = $routeParams.name || null,
        nid = $scope.nidsMap['/' + splitLoc[1]];

    //console.log($scope.nidsMap);

    Page.get({'nid':nid}, function (page) {
      $scope.page.nid = nid;
      $scope.node = page.node;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
      $scope.slider = page.node.composed_fields.field_philosophy_slider;
    });

    $scope.compareToName = function (title) {
      if (name) {
        return name.toLowerCase() === title.toLowerCase();
      } else {
        //when no name param always return true
        return true;
      }
    };


  } ]);

  /**
   * Design Controller
   */
  app.controller('DesignCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {

    var nid = $scope.nidsMap[$location.path()];
    console.log($scope.nidsMap);
    var page = Page.get({'nid':nid}, function () {
      $scope.page.nid = nid;
      $scope.node = page.node;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
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
          //$location.path(path);
          //($scope.page)? $scope.page = $scope.page : $scope.page = {};
          //$scope.page.nid = node;
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

(function (bs) {

  var app = angular.module('appRouter', []);

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
        controller: 'DesignCtrl'
      })
      .when('/design', {
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'DesignCtrl'
      })
      .when('/ux', {
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'DesignCtrl'
      })
      .when('/ux/:name', {
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'DesignCtrl'
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
(function (bootstrap) {

  var appServices = angular.module('appServices', ['ngResource']);

  appServices.factory('Page',
  ['$resource',
  function ($resource) {

    return $resource('/api/page/:nid');

  } ]);


})(bootstrap);