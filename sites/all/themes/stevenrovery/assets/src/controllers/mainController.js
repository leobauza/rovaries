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

    $scope.setSiteTitle = function (segment) {
      $rootScope.siteTitle = bs.siteTitle + ' | ' + segment;
    };

    //contact block
    $scope.contactBlurb = bs.contactInfo.blurb;
    $scope.contactEmail = bs.contactInfo.email;
    $scope.contactPhone = bs.contactInfo.phone;

    //site navigation
    $scope.links = bs.menu.links;

    //get nid only for top level pages
    $scope.getNid = function (path) {
      return link = _.find(bs.menu.links, function (data) {
        return data.path === path;
      }).nid;
    };

    //get nid for projects
    $scope.getProjectNid = function (base, view_name, node_title) {
      var node = _.find(bs.views[base][view_name], function (data) {
        return data.alias === base + '/' + node_title;
      });
      return node.nid
    };

    $scope.setNid = function (nid) {
      $scope.nid = nid;
      //console.log("set nid to:", nid);
    };

    $scope.setPageTitle = function (title) {
      $scope.page_title = title;
    }


  } ]);



})(bootstrap);