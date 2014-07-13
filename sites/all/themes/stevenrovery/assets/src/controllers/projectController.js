(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {

    //initiate vars
    var loc = $location.path(),
        nid = null,
        view_name = null,
        base = null;


    //get location variables
    base = loc.split('/')[1];
    view_name = base + '_projects';
    node_title = loc.split('/')[2];

    //get nid from url and set scope's nid
    nid = $scope.getProjectNid(base, view_name, node_title);
    $scope.setNid(nid);

    //request individual project page
    Page.get({'nid':$scope.nid}, function (page) {
      var custom = page.node.custom_fields,
          composed = page.node.composed_fields;

      $scope.project_title = page.node.title;
      $scope.role = custom.field_role.value;
      $scope.tag = custom.field_tags.taxonomy_term.name;
      $scope.rows = composed.field_project_rows;

      //console.log($scope.rows);

      $scope.setPageTitle(custom.field_tags.taxonomy_term.name);

    });


  }]);

})(bootstrap);