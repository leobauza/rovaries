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
  app.controller('DesignCtrl',
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
