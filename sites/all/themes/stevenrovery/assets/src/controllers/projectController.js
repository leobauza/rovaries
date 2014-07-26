(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', '$location', 'Page', 'page', 'project', 'data',
  function ($scope, $location, Page, page, project, data) {

    var custom = page.node.custom_fields,
        composed = page.node.collections_fields,
        base = data.base,
        view_name = data.view_name,
        total_projects = data.total_projects;

    //<title>
    $scope.setSiteTitle(page.node.title);

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
    $scope.project_title = page.node.title;
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


    $scope.groups = groups;
    $scope.projects = views;








    //set location vars
    // var loc = $location.path(),
    //     base = loc.split('/')[1],
    //     view_name = base + '_projects',
    //     node_title = loc.split('/')[2],
    //     totalProjects = _.size(bs.views[base][view_name]),
    //     project = $scope.getProjectNid(base, view_name, node_title),
    //     nid = project.nid;
    //
    //
    // //get nid from url and set scope's nid
    // $scope.setNid(nid);
    // $scope.base = base;
    //
    // //request individual project page
    // Page.get({'nid':$scope.nid}, function (page) {
    //
    //   var custom = page.node.custom_fields,
    //       composed = page.node.collections_fields;
    //
    //   //<title>
    //   $scope.setSiteTitle(page.node.title);
    //
    //   //<header>
    //   $scope.setPageTitle(custom.field_tags.taxonomy_term.name);
    //   //get previous project
    //   if (project.pos - 1 !== 0) {
    //     $scope.prevProject = $scope.getNeighbourProject(base, view_name, project.pos - 1);
    //   } else {
    //     $scope.prevProject = $scope.getNeighbourProject(base, view_name, totalProjects);
    //   }
    //
    //   //get next project
    //   if (project.pos + 1 > totalProjects) {
    //     $scope.nextProject = $scope.getNeighbourProject(base, view_name, 1);
    //   } else {
    //     $scope.nextProject = $scope.getNeighbourProject(base, view_name, project.pos + 1);
    //   }
    //
    //   //<article>
    //   $scope.project_title = page.node.title;
    //   $scope.role = custom.field_role.value;
    //   $scope.tag = custom.field_tags.taxonomy_term.name;
    //   $scope.rows = composed;
    //
    //   //displaying all projects at the bottom
    //   var views = bs.views[base][view_name],
    //       groups = {},
    //       i = 0, //iterator
    //       gi = 0; //group iterator
    //
    //   _.each(views, function (view) {
    //     (i % 3 === 0)? gi += 1 : gi = gi; //increase group iterator by one every 3
    //     groups[gi] = groups[gi] || {}; //make sure it exists
    //     groups[gi][i] = view; //add view to right group
    //     i += 1; //increase iterator by one
    //   });
    //
    //
    //   $scope.groups = groups;
    //   $scope.projects = views;
    //
    // });


  }]);

})(bootstrap);