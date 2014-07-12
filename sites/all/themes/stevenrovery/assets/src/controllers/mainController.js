(function (bs) {

  var app = angular.module('app');

  /**
   * Top Level Controller
   */
  app.controller('MainCtrl',
  ['$scope', '$location', '$rootScope',
  function ($scope, $location, $rootScope) {

    //browser title and header title
    $rootScope.siteTitle = bs.siteTitle;
    $rootScope.siteName = bs.siteTitle;

    //contact block
    $scope.contactBlurb = bs.contactInfo.blurb;
    $scope.contactEmail = bs.contactInfo.email;
    $scope.contactPhone = bs.contactInfo.phone;

    //
    $scope.links = bs.menu.links;
    //$scope.page = bs.node;
    //$scope.nid = bs.node.nid;


    //map the paths to the nids for the API calls
    //only for pages
    $scope.nidsMap = {};
    for (key in $scope.links) {
      $scope.nidsMap[$scope.links[key].path] = $scope.links[key].nid;
    }

    $scope.setNid = function (nid) {
      $scope.nid = nid;
      console.log("set nid to:", nid);
    };

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
