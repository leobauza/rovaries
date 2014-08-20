(function (bs) {
  "use strict";

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', 'page', 'project', 'data',
  function ($scope, page, project, data) {

    var custom = page.custom_fields,
        composed = page.collections_fields,
        base = data.base,
        view_name = data.view_name,
        total_projects = data.total_projects;

    //<title>
    $scope.setSiteTitle(page.title);

    //<header>
    $scope.setPageTitle(custom.field_tags.taxonomy_term.name);
    //get previous project
    if (project.pos - 1 !== 0) {
      $scope.prevProject = $scope.getNeighbourProject(base, view_name, project.pos - 1);
    } else {
      $scope.prevProject = $scope.getNeighbourProject(base, view_name, total_projects);
    }

    //get next project
    if (project.pos + 1 > total_projects) {
      $scope.nextProject = $scope.getNeighbourProject(base, view_name, 1);
    } else {
      $scope.nextProject = $scope.getNeighbourProject(base, view_name, project.pos + 1);
    }

    //<article>
    $scope.project_title = page.title;
    $scope.role = custom.field_role.value;
    $scope.tag = custom.field_tags.taxonomy_term.name;
    $scope.rows = composed;

    //displaying all projects at the bottom
    var views = bs.views[base][view_name],
        groups = {},
        i = 0, //iterator
        gi = 0; //group iterator

    _.each(views, function (view) {
      (i % 3 === 0)? gi += 1 : gi = gi; //increase group iterator by one every 3
      groups[gi] = groups[gi] || {}; //make sure it exists
      groups[gi][i] = view; //add view to right group
      i += 1; //increase iterator by one
    });

    $scope.base = base;
    $scope.groups = groups;
    $scope.projects = views;


  }]);

})(bootstrap);