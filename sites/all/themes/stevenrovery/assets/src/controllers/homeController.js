(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', '$location', 'page',
  function ($scope, $location, page) {

    //getting node id should be a service...
    //specially with the more complicated ones for projects
    var nid = $scope.getNid($location.path());

    console.log(nid);

    $scope.setSiteTitle('Home');

    $scope.setNid(nid);

    $scope.outputHtml = page.node.body.safe_value;

    // console.log("page", page);
    //
    // page.then(
    // function (data) {
    //   console.log(data);
    //   $scope.outputHtml = data.node.body.safe_value;
    // },
    // function (error) {
    //
    // })

    //console.log(page);

    // Page.get({'nid':nid}, function (page) {
    //
    //   $scope.setSiteTitle('Home');
    //
    //   //update node id for navigation
    //   $scope.setNid(nid);
    //   $scope.outputHtml = page.node.body.safe_value;
    //
    // });

  }]);


})(bootstrap);