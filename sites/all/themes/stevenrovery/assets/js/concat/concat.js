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
        templateUrl: bs.tplsPath + '/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux', {
        templateUrl: bs.tplsPath + '/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/ux/:name', {
        templateUrl: bs.tplsPath + '/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/design/:name', {
        templateUrl: bs.tplsPath + '/projects.html',
        controller: 'ProjectsCtrl'
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
    var nid = $scope.getNid($location.path());
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
        nid = $scope.getNid('/' + splitLoc[1]);

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
  ['$scope', '$location', 'Page',
  function ($scope, $location, Page) {
    //get node ID for this project
    $scope.title = "nothing";

    //return if it's a landing page
    if ($scope.landing || !$scope.nid) {
      return;
    }

    Page.get({'nid':$scope.nid}, function (page) {
      //console.log(page);
      var custom = page.node.custom_fields,
          composed = page.node.composed_fields;

      $scope.project_title = page.node.title;
      $scope.role = custom.field_role.value;
      $scope.tag = custom.field_tags.taxonomy_term.name;
      $scope.rows = composed.field_project_rows;

      //console.log($scope.rows);

      $scope.setPageTitle(custom.field_tags.taxonomy_term.name);


    });


  }]);

})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectsCtrl',
  ['$scope', '$location', 'Page', '$routeParams',
  function ($scope, $location, Page, $routeParams) {

    var loc = $location.path(),
        nid = null,
        view_name = null,
        base = null;

    //console.log(type);
    $scope.setPageTitle = function (title) {
      $scope.title = title;
    }

    if (!$routeParams.name) {

      nid = $scope.getNid(loc);
      $scope.landing = true;

    } else {
      base = loc.split('/')[1];
      view_name = base + '_projects';
      node_title = loc.split('/')[2];

      nid = $scope.getProjectNid(base, view_name, node_title);
      console.log(nid);
      $scope.landing = false;
      $scope.setNid(nid);

    }

    //Return if not a landing page...
    if (!$scope.landing) {
      return;
    }
    //console.log($scope.nidsMap);
    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);

      //show the right view
      if (page.views) {
        var views = page.views.design_projects || page.views.ux_projects;
      } else {
        var views = null;
      }

      // console.log(page);
      // console.log(views);

      $scope.projects = views;
      //$scope.node = page.node;
      $scope.setPageTitle(page.node.title);
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