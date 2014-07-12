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
    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);

      if (page.views) {
        var views = page.views.design_projects || page.views.ux_projects;
      } else {
        var views = null;
      }


      // console.log(page);
      // console.log(views);

      $scope.projects = views;
      $scope.node = page.node;
      $scope.title = page.node.title;
      //$scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });


  } ]);

})(bootstrap);