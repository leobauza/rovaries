(function (bs) {

  var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'btford.markdown',
    'ngAnimate'
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
        templateUrl: bs.tplsPath + '/resume.html',
        controller: 'ResumeCtrl'
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
        templateUrl: bs.tplsPath + '/project.html',
        controller: 'ProjectCtrl'
      })
      .when('/design/:name', {
        templateUrl: bs.tplsPath + '/project.html',
        controller: 'ProjectCtrl'
      })
      .otherwise({

        template: "doesn't exist"

      });

    $locationProvider.html5Mode(true).hashPrefix('!');

  } ]);

  app.run(['$rootScope', '$location', '$window',
  function ($rootScope, $location, $window) {

    $rootScope.$on('$locationChangeStart', function (event, next) {

      var parts = next.split('/');
      //handle admin route
      if (_.contains(parts, 'admin') || _.contains(parts, 'admin_menu')) {
        $window.location.href = next;
      }

    });

  }]);


  // app.animation('.site__main', ['$timeout', function ($timeout) {
  //
  //   return {
  //     enter: function (element, done) {
  //       console.log("entering a page");
  //       $timeout(function () {
  //         done();
  //       }, 1000);
  //     },
  //     leave: function (element, done) {
  //       console.log("leaving a page");
  //       done();
  //     }
  //
  //   };
  //
  // }]);


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

    console.log(nid);

    Page.get({'nid':nid}, function (page) {

      $scope.setSiteTitle('Home');

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

    $scope.setSiteTitle = function (segment) {
      //$rootScope.siteTitle = bs.siteTitle + ' | ' + segment;
      $rootScope.siteTitle = segment;
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
      return _.find(bs.views[base][view_name], function (data) {
        return data.alias === base + '/' + node_title;
      });
    };

    $scope.getNeighbourProject = function (base, view_name, pos) {
      return _.find(bs.views[base][view_name], function (data) {
        return data.pos === pos;
      });
    }


    $scope.setNid = function (nid) {
      $scope.nid = nid;
      //console.log("set nid to:", nid);
    };

    $scope.setPageTitle = function (title) {
      $scope.page_title = title;
    }


  } ]);



})(bootstrap);

(function (bs) {

  var app = angular.module('app');

  /**
   * Philosophy Controller
   */
  app.controller('PhilCtrl',
  ['$scope', '$location', '$routeParams', 'Page', '$rootScope', '$cacheFactory',
  function ($scope, $location, $routeParams, Page, $rootScope, $cacheFactory) {

    var location = $location.path(),
        splitLoc = location.split('/'),
        name = $routeParams.name || null,
        nid = $scope.getNid('/' + splitLoc[1]);

    var cache = $cacheFactory.get('$http'),
        page = cache.get('/api/page/' + nid);

    if (page) {
      //console.log(JSON.parse(page[1]));
    }

    $scope.slider_philosophy = name; //true or false decides whether to show the slider or front page

    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);
      $scope.setSiteTitle(page.node.title);
      $scope.setPageTitle(page.node.title);

      //$scope.node = page.node;
      var slider = page.node.composed_fields.field_philosophy_slider,
          si = 1; //slide iterator

      $scope.slider_size = _.size(slider);

      $scope.slider = _.map(slider, function (slide) {
        slide['id'] = si;
        si += 1;
        return slide;
      });



      var phil_boxes = page.node.composed_fields.field_philosophy_slider,
          groups = {},
          i = 0, //iterator
          gi = 0; //group iterator

      _.each(phil_boxes, function (box) {
        (i % 3 === 0)? gi += 1 : gi = gi; //increase group iterator by one every 3
        groups[gi] = groups[gi] || {}; //make sure it exists
        groups[gi][i] = box; //add view to right group
        i += 1; //increase iterator by one
      });

      $scope.phil_groups = groups;

    });


    $scope.compareToName = function (title) {
      if (name) {
        return name.toLowerCase() === title.toLowerCase();
      } else {
        //when no name param always return true
        return true;
      }
    };

    $scope.getPrevSlide = function (id) {

      if (id - 1 === 0) {
        return _.where($scope.slider, {id: $scope.slider_size});
      } else {
        return _.where($scope.slider, {id: id-1});
      }

    };

    $scope.getNextSlide = function (id) {


      if (id + 1 > $scope.slider_size) {
        return _.where($scope.slider, {id: 1});
      } else {
        return _.where($scope.slider, {id: id+1});
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

    //set location vars
    var loc = $location.path(),
        base = loc.split('/')[1],
        view_name = base + '_projects',
        node_title = loc.split('/')[2],
        totalProjects = _.size(bs.views[base][view_name]),
        project = $scope.getProjectNid(base, view_name, node_title),
        nid = project.nid;


    //get nid from url and set scope's nid
    $scope.setNid(nid);
    $scope.base = base;

    //request individual project page
    Page.get({'nid':$scope.nid}, function (page) {
      var custom = page.node.custom_fields,
          composed = page.node.composed_fields;

      //<title>
      $scope.setSiteTitle(page.node.title);

      //<header>
      $scope.setPageTitle(custom.field_tags.taxonomy_term.name);
      //get previous project
      if (project.pos - 1 !== 0) {
        $scope.prevProject = $scope.getNeighbourProject(base, view_name, project.pos - 1);
      } else {
        $scope.prevProject = $scope.getNeighbourProject(base, view_name, totalProjects);
      }

      //get next project
      if (project.pos + 1 > totalProjects) {
        $scope.nextProject = $scope.getNeighbourProject(base, view_name, 1);
      } else {
        $scope.nextProject = $scope.getNeighbourProject(base, view_name, project.pos + 1);
      }

      //<article>
      $scope.project_title = page.node.title;
      $scope.role = custom.field_role.value;
      $scope.tag = custom.field_tags.taxonomy_term.name;
      $scope.rows = composed.field_project_rows;

      //displaying all projects at the bottom
      var views = bs.views[base][view_name],
          groups = {},
          i = 0, //iterator
          gi = 0; //group iterator

      _.each(views, function (view) {
        (i % 3 === 0)? gi += 1 : gi = gi; //increase group iterator by one every 3
        groups[gi] = groups[gi] || {}; //make sure it exists
        groups[gi][i] = view; //add view to right group
        i += 1; //increase iterator by one
      });


      $scope.groups = groups;
      $scope.projects = views;

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
        nid = null;

    nid = $scope.getNid(loc);

    //console.log($scope.nidsMap);
    Page.get({'nid':nid}, function (page) {
      $scope.setSiteTitle(page.node.title);

      //update node id for navigation
      $scope.setNid(nid);

      //show the right view
      if (page.views) {
        var views = page.views.design_projects || page.views.ux_projects;
      } else {
        var views = null;
      }

      var groups = {},
          i = 0, //iterator
          gi = 0; //group iterator

      _.each(views, function (view) {
        (i % 3 === 0)? gi += 1 : gi = gi; //increase group iterator by one every 3
        groups[gi] = groups[gi] || {}; //make sure it exists
        groups[gi][i] = view; //add view to right group
        i += 1; //increase iterator by one
      });

      $scope.groups = groups;
      $scope.projects = views;
      //$scope.node = page.node;
      $scope.setPageTitle(page.node.title);
      //$scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
    });


  } ]);

})(bootstrap);
(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('ResumeCtrl',
  ['$scope', '$location', 'Page', '$rootScope',
  function ($scope, $location, Page, $rootScope) {

    //getting node id should be a service...
    //specially with the more complicated ones for projects
    var nid = $scope.getNid($location.path());

    Page.get({'nid':nid}, function (page) {

      var composed = page.node.composed_fields,
          custom = page.node.custom_fields;

      $scope.setSiteTitle(page.node.title);
      $scope.setPageTitle(page.node.title);

      //update node id for navigation
      $scope.setNid(nid);
      $scope.experience = composed.field_experience;
      $scope.schools = composed.field_education;
      $scope.awards = composed.field_awards;

      $scope.resume = custom.field_resume;
      $scope.arbitrary_links = composed.field_arbitrary_links;


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

    return $resource('/api/page/:nid', {}, {
      get: {
        cache: true,
        method: 'GET'
      }
    });

  }]);


  /**
   * Non API Services
   */



})(bootstrap);