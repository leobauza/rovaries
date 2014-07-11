(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', '$location', 'Page', '$rootScope',
  function ($scope, $location, Page, $rootScope) {

    //getting node id should be a service...
    //specially with the more complicated ones for projects
    var nid = $scope.nidsMap[$location.path()];

    Page.get({'nid':nid}, function (page) {
      $scope.page.nid = nid;
      //$scope.node = page.node;
      $scope.outputHtml = page.node.body.safe_value;
    });

  } ]);


})(bootstrap);