(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', '$location', 'Page', '$routeParams',
  function ($scope, $location, Page, $routeParams) {
    $scope.setNid(null);
    $scope.title = "nothing";
    console.log($routeParams);

  }]);

})(bootstrap);