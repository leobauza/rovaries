(function (bs) {

  var app = angular.module('app', [
    'ngRoute',
    'ngResource'
  ]);


})(bootstrap);

(function (bs) {

  var app = angular.module('app');

  app.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: bs.tplsPath + '/home.html',
        controller: 'HomeCtrl'
      })
      .when('/philosophy', {
        templateUrl: bs.tplsPath + '/philosophy.html',
        controller: 'PhilCtrl'
      })
      .when('/philosophy/:name', {
        templateUrl: bs.tplsPath + '/philosophy.html',
        controller: 'PhilCtrl'
      })
      .when('/resume', {
        templateUrl: bs.tplsPath + '/design.html',
        controller: 'HomeCtrl'
      })
      .when('/design', {
        templateUrl: bs.tplsPath + '/projects-landing.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux', {
        templateUrl: bs.tplsPath + '/projects-landing.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux/:name', {
        templateUrl: bs.tplsPath + '/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/design/:name', {
        templateUrl: bs.tplsPath + '/project.html',
        controller: 'ProjectCtrl'
      })
      .otherwise({
        //redirectTo: '/'
        template: "doesn't exist",
        controller: function ($scope, $route, $location) {
          var path = $location.path(),
              parts = path.split("/"),
              admin = parts[1];
          //best I got for going to the admin menu for now...
          if (admin === 'admin') {
            window.location.reload();
          } else {
            //$location.path('/');
          }
        }
      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  } ]);


})(bootstrap);
(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('HomeCtrl',
  ['$scope', '$location', 'Page', '$rootScope',
  function ($scope, $location, Page, $rootScope) {

    //getting node id should be a service...
    //specially with the more complicated ones for projects
    var nid = $scope.nidsMap[$location.path()];
    Page.get({'nid':nid}, function (page) {
      //update node id for navigation
      $scope.setNid(nid);
      $scope.outputHtml = page.node.body.safe_value;
    });

  } ]);


})(bootstrap);
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
        nid = $scope.nidsMap['/' + splitLoc[1]];

    //console.log($scope.nidsMap);

    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);

      //root scope stuff...move into servie as well...
      $rootScope.siteTitle = bs.siteTitle + ' | ' + page.node.title;


      //$scope.node = page.node;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
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
(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', '$location', 'Page', '$routeParams',
  function ($scope, $location, Page, $routeParams) {
    $scope.title = "nothing";
    console.log($routeParams);

  }]);

})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectsCtrl',
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {

    var nid = $scope.nidsMap[$location.path()];

    //console.log($scope.nidsMap);
    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);

      if (page.views) {
        var views = page.views.design_projects || page.views.ux_projects;
      } else {
        var views = null;
      }


      // console.log(page);
      // console.log(views);

      $scope.projects = views;
      $scope.node = page.node;
      $scope.title = page.node.title;
      //$scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });


  } ]);

})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  app.directive('siteNav', function () {
    return {
      restrict: 'E',
      templateUrl: bs.tplsPath + '/site-nav.html',
      controller: ['$location', '$scope', function ($location, $scope) {
        $scope.changePage = function (node, path) {
          //$location.path(path);
          //($scope.page)? $scope.page = $scope.page : $scope.page = {};
          //$scope.page.nid = node;
        }
      }]
    }
  });


})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  app.filter('unsafe', function ($sce) {
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  });

})(bootstrap);
(function (bootstrap) {

  var app = angular.module('app');

  /**
   * API Services
   */
  app.factory('Page',
  ['$resource',
  function ($resource) {

    return $resource('/api/page/:nid');

  } ]);

  /**
   * Non API Services
   */
  


})(bootstrap);