(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectsCtrl',
  ['$scope', '$location', 'Page', '$routeParams',
  function ($scope, $location, Page, $routeParams) {

    var loc = $location.path(),
        nid = null,
        view_name = null,
        base = null;

    //console.log(type);
    $scope.setPageTitle = function (title) {
      $scope.title = title;
    }

    if (!$routeParams.name) {

      nid = $scope.getNid(loc);
      $scope.landing = true;

    } else {
      base = loc.split('/')[1];
      view_name = base + '_projects';
      node_title = loc.split('/')[2];

      nid = $scope.getProjectNid(base, view_name, node_title);
      console.log(nid);
      $scope.landing = false;
      $scope.setNid(nid);

    }

    //Return if not a landing page...
    if (!$scope.landing) {
      return;
    }
    //console.log($scope.nidsMap);
    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);

      //show the right view
      if (page.views) {
        var views = page.views.design_projects || page.views.ux_projects;
      } else {
        var views = null;
      }

      // console.log(page);
      // console.log(views);

      $scope.projects = views;
      //$scope.node = page.node;
      $scope.setPageTitle(page.node.title);
      //$scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });




  } ]);

})(bootstrap);