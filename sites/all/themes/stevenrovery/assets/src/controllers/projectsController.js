(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectsCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {

    var nid = $scope.nidsMap[$location.path()];
    //console.log($scope.nidsMap);
    var page = Page.get({'nid':nid}, function () {
      $scope.page.nid = nid;
      $scope.node = page.node;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });


  } ]);

})(bootstrap);