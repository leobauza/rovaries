(function (bs) {

  var app = angular.module('app');

  /**
   * Philosophy Controller
   */
  app.controller('PhilCtrl',
  ['$scope', '$location', '$routeParams', 'Page', '$rootScope',
  function ($scope, $location, $routeParams, Page, $rootScope) {

    var location = $location.path(),
        splitLoc = location.split('/'),
        name = $routeParams.name || null,
        nid = $scope.getNid('/' + splitLoc[1]);

    //console.log($scope.nidsMap);

    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);
      $scope.setSiteTitle(page.node.title);
      $scope.setPageTitle(page.node.title);


      //$scope.node = page.node;
      $scope.slider = page.node.composed_fields.field_philosophy_slider;
    });

    $scope.compareToName = function (title) {
      if (name) {
        return name.toLowerCase() === title.toLowerCase();
      } else {
        //when no name param always return true
        return true;
      }
    };


  } ]);

})(bootstrap);