(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {

    //set location vars
    var loc = $location.path(),
        base = loc.split('/')[1],
        view_name = base + '_projects',
        node_title = loc.split('/')[2],
        totalProjects = _.size(bs.views[base][view_name]),
        project = $scope.getProjectNid(base, view_name, node_title),
        nid = project.nid;

    //get nid from url and set scope's nid
    $scope.setNid(nid);
    $scope.base = base;

    //request individual project page
    Page.get({'nid':$scope.nid}, function (page) {
      var custom = page.node.custom_fields,
          composed = page.node.composed_fields;

      //<title>
      $scope.setSiteTitle(page.node.title);

      //<header>
      $scope.setPageTitle(custom.field_tags.taxonomy_term.name);
      //get previous project
      if (project.pos - 1 !== 0) {
        $scope.prevProject = $scope.getPrevProject(base, view_name, project.pos - 1);
      } else {
        $scope.prevProject = $scope.getPrevProject(base, view_name, totalProjects);
      }

      //get next project
      if (project.pos + 1 > totalProjects) {
        $scope.nextProject = $scope.getPrevProject(base, view_name, 1);
      } else {
        $scope.nextProject = $scope.getPrevProject(base, view_name, project.pos + 1);
      }

      //<article>
      $scope.project_title = page.node.title;
      $scope.role = custom.field_role.value;
      $scope.tag = custom.field_tags.taxonomy_term.name;
      $scope.rows = composed.field_project_rows;


    });


  }]);

})(bootstrap);