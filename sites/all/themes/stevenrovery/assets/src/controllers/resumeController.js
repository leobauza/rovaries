(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('ResumeCtrl',
  ['$scope', 'page',
  function ($scope, page) {

    var composed = page.composed_fields,
        custom = page.custom_fields,
        nid = page.nid;

    $scope.setSiteTitle(page.title);
    $scope.setPageTitle(page.title);

    //update node id for navigation
    $scope.setNid(nid);
    $scope.experience = composed.field_experience;
    $scope.schools = composed.field_education;
    $scope.awards = composed.field_awards;

    $scope.resume = custom.field_resume;
    $scope.arbitrary_links = composed.field_arbitrary_links;

  } ]);


})(bootstrap);