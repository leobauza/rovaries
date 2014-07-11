(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {

    var nid = $scope.nidsMap[$location.path()];

    Page.get({'nid':nid}, function (page) {
      $scope.page.nid = nid;
      //$scope.node = page.node;
      $scope.outputHtml = page.node.body.safe_value;
    });

  } ]);


})(bootstrap);