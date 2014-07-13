(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {
    //get node ID for this project
    $scope.title = "nothing";

    //return if it's a landing page
    if ($scope.landing || !$scope.nid) {
      return;
    }

    Page.get({'nid':$scope.nid}, function (page) {
      console.log(page);
      var custom = page.node.custom_fields,
          composed = page.node.composed_fields;

      $scope.project_title = page.node.title;
      $scope.role = custom.field_role.value;
      $scope.tag = custom.field_tags.taxonomy_term.name;
      $scope.rows = composed.field_project_rows;

      $scope.setPageTitle(custom.field_tags.taxonomy_term.name);


    });


  }]);

})(bootstrap);