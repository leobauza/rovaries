(function (bs) {

  var app = angular.module('app');

  /**
   * Top Level Controller
   */
  app.controller('MainCtrl',
  ['$scope', '$location', '$rootScope',
  function ($scope, $location, $rootScope) {

    //root scope
    console.log(bs.contactInfo);
    console.log(bs.siteTitle);
    $rootScope.siteTitle = bs.siteTitle;

    $scope.links = bs.menu.links;
    $scope.page = bs.node;
    $scope.page.nid = bs.node.nid;
    //map the paths to the nids for the API calls
    $scope.nidsMap = {};
    for (key in $scope.links) {
      $scope.nidsMap[$scope.links[key].path] = $scope.links[key].nid;
    }


  } ]);

  /**
   * Test Controller
   */
  app.controller('TestCtrl',
  ['$scope', '$location', 'Page', '$timeout',
  function ($scope, $location, Page, $timeout) {

    var nid = $scope.nidsMap[$location.path()];

    var page = Page.get({'nid':nid}, function () {
      $scope.page.nid = nid;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });

  } ]);




})(bootstrap);
