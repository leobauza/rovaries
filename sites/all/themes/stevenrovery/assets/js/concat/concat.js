(function (bs) {

  var app = angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'btford.markdown',
    'ngAnimate'
  ]);


})(bootstrap);

(function () {

  var app = angular.module('app');

  app.animation('.site__main',
  ['$rootScope', '$location', '$timeout', '$q',
  function ($rootScope, $location, $timeout, $q) {

    var isNextPhilosophy, isCurrentPhilosophy;
    isCurrentPhilosophy = _.contains($location.path().split('/'), 'philosophy');


    /**
     * Router has started changing the url
     */
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      var parts = next.split('/');
      isCurrentPhilosophy = _.contains(current.split('/'), 'philosophy');
      isNextPhilosophy = _.contains(parts, 'philosophy');


      if (isCurrentPhilosophy && isNextPhilosophy) {
        console.log("curren is phil and next is phil");
        $rootScope.animationAux = null;
      }
      if (!isCurrentPhilosophy) {
        console.log("current isn't phill");
        $rootScope.animationAux = 'pending';
      }
      if (isCurrentPhilosophy && !isNextPhilosophy) {
        console.log("current is phil and next isnt");
        $rootScope.animationAux = 'pending';
      }


    });

    /**
     * View content has been loaded
     */
    $rootScope.$on('$viewContentLoaded', function (event) {

    });


    return {
      enter: function (element, done) {
        var imgs = jQuery(element).find('.project-row__image');

        if (isCurrentPhilosophy && isNextPhilosophy) {
          $rootScope.animationAux = null;
        }
        if (!isCurrentPhilosophy) {
          element.parent().height(0);
        }
        if (isCurrentPhilosophy && !isNextPhilosophy) {
          element.parent().height(0);
        }


        if (imgs.length !== 0) {
          var size = _.size(imgs),
              i = 0,
              d = $q.defer();

          _.each(imgs, function (img) {
            console.log(img);
            jQuery(img).on('load', function () {
              i += 1;
              if (i === size) {
                d.resolve(element[0].offsetHeight);
              }
            });
          });

          d.promise.then(function (height) {
            //element.parent().height(0);
            $timeout(function () {
              element.parent().height(height);
              $rootScope.animationAux = null;
            }, 500);
          });

        } else {

          var height = element[0].offsetHeight
          //element.parent().height(0);
          $timeout(function () {
            element.parent().height(height);
            $rootScope.animationAux = null;
          }, 500);

        }

      },
      leave: function (element, done) {

        // var height = element[0].offsetHeight
        //console.log(height);
        // element.height(height);
        element.height(0);

        done();

      }

    };

  }]);

})();
(function (bs) {

  var app = angular.module('app');

  app.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: bs.tplsPath + '/home.html',
      controller: 'HomeCtrl',

      resolve: {
        "page": ['Resolver', function (Resolver) {
          return Resolver.get('/');
        }]
      }

    })

    .when('/philosophy', {
      templateUrl: bs.tplsPath + '/philosophy.html',
      controller: 'PhilCtrl',

      resolve: {
        "page" : ['$routeParams', 'Resolver', function ($routeParams, Resolver) {
          return Resolver.get('/philosophy');
        }]
      }

    })

    .when('/philosophy/:name', {
      reloadOnSearch: false,
      templateUrl: bs.tplsPath + '/philosophy.html',
      controller: 'PhilCtrl',

      resolve: {
        "page" : ['$routeParams', 'Resolver', function ($routeParams, Resolver) {
          return Resolver.get('/philosophy');
        }]
      }

    })

    .when('/resume', {
      templateUrl: bs.tplsPath + '/resume.html',
      controller: 'ResumeCtrl',

      resolve: {
        "page" : ['Resolver', function (Resolver) {
          return Resolver.get('/resume');
        }]
      }

    })

    .when('/design', {
      templateUrl: bs.tplsPath + '/projects.html',
      controller: 'ProjectsCtrl',

      resolve: {
        "page" : ['Resolver', function (Resolver) {
          return Resolver.getProjects('/design');
        }]
      }

    })

    .when('/ux', {
      templateUrl: bs.tplsPath + '/projects.html',
      controller: 'ProjectsCtrl',

      resolve: {
        "page" : ['Resolver', function (Resolver) {
          return Resolver.getProjects('/ux');
        }]
      }


    })

    .when('/ux/:name', {
      templateUrl: bs.tplsPath + '/project.html',
      controller: 'ProjectCtrl',

      resolve: {
        "page" : ['Resolver', '$route', function (Resolver, $route) {
          return Resolver.getProject('/ux/' + $route.current.params.name);
        }],
        "project" : ['$route', function ($route) {
          return _.find(bs.views.ux.ux_projects, function (data) {
            return data.alias === 'ux' + '/' + $route.current.params.name;
          });
        }],
        "data" : [function () {
          return {
            total_projects: _.size(bs.views.ux.ux_projects),
            base: 'ux',
            view_name: 'ux_projects',
          }
        }]
      }

    })

    .when('/design/:name', {
      templateUrl: bs.tplsPath + '/project.html',
      controller: 'ProjectCtrl',

      resolve: {
        "page" : ['Resolver', '$route', function (Resolver, $route) {
          return Resolver.getProject('/design/' + $route.current.params.name);
        }],
        "project" : ['$route', function ($route) {
          return _.find(bs.views.design.design_projects, function (data) {
            return data.alias === 'design' + '/' + $route.current.params.name;
          });
        }],
        "data" : [function () {
          return {
            total_projects: _.size(bs.views.design.design_projects),
            base: 'design',
            view_name: 'design_projects',
          }
        }]
      }

    })

    .when('/home', {
      redirectTo: '/'
    })

    .otherwise({
      template: "doesn't exist"
    });

    $locationProvider.html5Mode(true).hashPrefix('!');

  }]);

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


})(bootstrap);
(function (bs) {

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
(function (bs) {

  var app = angular.module('app');

  /**
   * Top Level Controller
   */
  app.controller('MainCtrl',
  ['$scope', '$rootScope', '$timeout',
  function ($scope, $rootScope, $timeout) {

    //browser title and header title
    $rootScope.siteTitle = bs.siteTitle;
    $rootScope.siteName = bs.siteTitle;

    $scope.setSiteTitle = function (segment) {
      $rootScope.siteTitle = bs.siteTitle + ' | ' + segment;
      //$rootScope.siteTitle = segment;
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

    $scope.$on('$routeChangeStart', function () {
      $scope.viewLoading = true;
    });

    $scope.$on('$routeChangeSuccess', function () {
      $timeout(function () {
        $scope.viewLoading = false;
      }, 1000);
    });




  } ]);



})(bootstrap);

(function (bs) {

  var app = angular.module('app');

  /**
   * Philosophy Controller
   */
  app.controller('PhilCtrl',
  ['$scope', '$routeParams', 'page',
  function ($scope, $routeParams, page) {

    var node = page,
        name = $routeParams.name || null,
        slider = node.collections_fields,
        slider_size = _.size(slider);
        phil_boxes = node.collections_fields,
        si = 1, //slide iterator
        groups = {}, //group boxes together
        i = 0, //individual iterator for boxes
        gi = 0; //groups iterator

    //true or false decides whether to show the slider or front page
    $scope.slider_philosophy = name;


    //update node id for navigation
    $scope.setNid(node.nid);
    $scope.setSiteTitle(node.title);
    $scope.setPageTitle(node.title);

    $scope.slider = _.map(slider, function (slide) {
      slide['id'] = si;
      si += 1;
      return slide;
    });

    _.each(phil_boxes, function (box) {
      (i % 3 === 0)? gi += 1 : gi = gi; //increase group iterator by one every 3
      groups[gi] = groups[gi] || {}; //make sure it exists
      groups[gi][i] = box; //add view to right group
      i += 1; //increase iterator by one
    });

    $scope.phil_groups = groups;



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
        return _.where($scope.slider, {id: slider_size});
      } else {
        return _.where($scope.slider, {id: id-1});
      }

    };

    $scope.getNextSlide = function (id) {

      if (id + 1 > slider_size) {
        return _.where($scope.slider, {id: 1});
      } else {
        return _.where($scope.slider, {id: id+1});
      }

    };


  }]);

})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectCtrl',
  ['$scope', 'page', 'project', 'data',
  function ($scope, page, project, data) {

    var custom = page.custom_fields,
        composed = page.collections_fields,
        base = data.base,
        view_name = data.view_name,
        total_projects = data.total_projects;

    //<title>
    $scope.setSiteTitle(page.title);

    //<header>
    $scope.setPageTitle(custom.field_tags.taxonomy_term.name);
    //get previous project
    if (project.pos - 1 !== 0) {
      $scope.prevProject = $scope.getNeighbourProject(base, view_name, project.pos - 1);
    } else {
      $scope.prevProject = $scope.getNeighbourProject(base, view_name, total_projects);
    }

    //get next project
    if (project.pos + 1 > total_projects) {
      $scope.nextProject = $scope.getNeighbourProject(base, view_name, 1);
    } else {
      $scope.nextProject = $scope.getNeighbourProject(base, view_name, project.pos + 1);
    }

    //<article>
    $scope.project_title = page.title;
    $scope.role = custom.field_role.value;
    $scope.tag = custom.field_tags.taxonomy_term.name;
    $scope.rows = composed;

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

    $scope.base = base;
    $scope.groups = groups;
    $scope.projects = views;


  }]);

})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  /**
   * Design Controller
   */
  app.controller('ProjectsCtrl',
  ['$scope', 'page',
  function ($scope, page) {

    var nid = page.nid;

    $scope.setSiteTitle(page.title);

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
    $scope.setPageTitle(page.title);
    //$scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;


  } ]);

})(bootstrap);
(function (bs) {

  var app = angular.module('app');
  /**
   * Home Controller
   */
  app.controller('ResumeCtrl',
  ['$scope', 'page',
  function ($scope, page) {

    var composed = page.composed_fields,
        custom = page.custom_fields,
        nid = page.nid;

    $scope.setSiteTitle(page.title);
    $scope.setPageTitle(page.title);

    //update node id for navigation
    $scope.setNid(nid);
    $scope.experience = composed.field_experience;
    $scope.schools = composed.field_education;
    $scope.awards = composed.field_awards;

    $scope.resume = custom.field_resume;
    $scope.arbitrary_links = composed.field_arbitrary_links;

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

  app.directive('resize', ['$window', '$rootScope', function ($window, $rootScope) {

    return function ($scope) {

      if ($window.innerWidth <= 700) {
        console.log("start mobile");
        $rootScope.mobile = $window.innerWidth;
      } else {
        $rootScope.mobile = null;
      }

      angular.element($window).bind('resize', function () {
        if ($window.innerWidth <= 700) {
          $rootScope.mobile = $window.innerWidth;
        } else {
          $rootScope.mobile = null;
        }

        $scope.$apply();

      });
    }

  }]);


  app.directive('viewParent', [function () {

    function linkFunction ($scope, el, attrs) {

      el.height(0);

      attrs.$observe('viewParent', function (val) {
        if (val === 'pending') {
          el.height(0);
        }
      });

    }

    return {
      restrict: 'A',
      replace: true,
      compile: function (tElem) {
        //console.log(tElem);
        return linkFunction;
      }
    }

  }]);


})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  app.filter('unsafe', function ($sce) {
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  });

})(bootstrap);
(function (bs) {

  var app = angular.module('app');

  app.service('Resolver', ['$http', '$q', '$timeout', '$rootScope', function ($http, $q, $timeout, $rootScope) {

    this.get = function (route) {

      var nid,
          d = $q.defer();

      nid = _.find(bs.menu.links, function (data) { return data.path === route; }).nid;

      //check that 'bootstrap' doesn't have this before doing a get request...
      if (nid === bs.node.nid) {
        d.resolve(bs.node);
        return d.promise;
      }

      $http.get('/api/node/' + nid, {
        cache: true
      })
      .success(function (data) {
        d.resolve(data);
      })
      .error(function (err) {
        d.reject(err);
      });

      return d.promise;

    };

    this.getProjects = function (route) {

      var nid = _.find(bs.menu.links, function (data) { return data.path === route; }).nid,
          page = {};

      page.views = {};
      page.nid = nid;

      if (route === '/design') {
        page.title = 'Design';
        page.views = bs.views.design;
      }
      if (route === '/ux') {
        page.title = 'Ux';
        page.views = bs.views.ux;
      }

      return page;
    }

    this.getProject = function (route) {

      var nid,
          d = $q.defer(),
          loc = route,
          base = loc.split('/')[1],
          view_name = base + '_projects',
          node_title = loc.split('/')[2];


      nid = _.find(bs.views[base][view_name], function (data) {
        return data.alias === base + '/' + node_title;
      }).nid;

      console.log("on landing these are the nids");
      console.log(nid, bs.node.nid);

      if (nid === bs.node.nid) {
        d.resolve(bs.node);
        return d.promise;
      }

      $http.get('/api/node/' + nid, {
        cache: true
      })
      .success(function (data) {
        //console.log(data.node.collections_fields);

        // _.each(data.node.collections_fields, function (fields) {
        //   fields.img = fields.img + "?v=1&cache=" + ( new Date() ).getTime();
        // });
        d.resolve(data);
      })
      .error(function (err) {
        d.reject(err);
      });

      return d.promise;

    };

    return this;

  }]);




})(bootstrap);