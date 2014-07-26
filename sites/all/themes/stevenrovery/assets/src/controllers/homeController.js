(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', 'page',
  function ($scope, page) {


    $scope.setSiteTitle('Home');

    $scope.setNid(page.node.nid);

    $scope.outputHtml = page.node.body.safe_value;


  }]);


})(bootstrap);