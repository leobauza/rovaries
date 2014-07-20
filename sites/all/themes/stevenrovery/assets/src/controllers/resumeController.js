(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('ResumeCtrl',
  ['$scope', '$location', 'Page', '$rootScope',
  function ($scope, $location, Page, $rootScope) {

    //getting node id should be a service...
    //specially with the more complicated ones for projects
    var nid = $scope.getNid($location.path());

    Page.get({'nid':nid}, function (page) {

      var composed = page.node.composed_fields,
          custom = page.node.custom_fields;

      $scope.setSiteTitle(page.node.title);
      $scope.setPageTitle(page.node.title);

      //update node id for navigation
      $scope.setNid(nid);
      $scope.experience = composed.field_experience;
      $scope.schools = composed.field_education;
      $scope.awards = composed.field_awards;

      $scope.resume = custom.field_resume;
      $scope.arbitrary_links = composed.field_arbitrary_links;


    });

  } ]);


})(bootstrap);