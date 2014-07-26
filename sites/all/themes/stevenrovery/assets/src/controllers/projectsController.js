(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectsCtrl',
  ['$scope', '$location', 'Page', '$routeParams', 'page',
  function ($scope, $location, Page, $routeParams, page) {

    var nid = page.node.nid;

    $scope.setSiteTitle(page.node.title);

    //update node id for navigation
    $scope.setNid(nid);

    //show the right view
    if (page.views) {
      var views = page.views.design_projects || page.views.ux_projects;
    } else {
      var views = null;
    }

    var groups = {},
        i = 0, //iterator
        gi = 0; //group iterator

    _.each(views, function (view) {
      (i % 3 === 0)? gi += 1 : gi = gi; //increase group iterator by one every 3
      groups[gi] = groups[gi] || {}; //make sure it exists
      groups[gi][i] = view; //add view to right group
      i += 1; //increase iterator by one
    });

    $scope.groups = groups;
    $scope.projects = views;
    //$scope.node = page.node;
    $scope.setPageTitle(page.node.title);
    //$scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;


  } ]);

})(bootstrap);