(function (bs) {
  "use strict";

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', 'page',
  function ($scope, page) {


    $scope.setSiteTitle('Home');

    $scope.setNid(page.nid);

    $scope.outputHtml = page.body.safe_value;


  }]);


})(bootstrap);