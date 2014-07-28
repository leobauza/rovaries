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
      //reloadOnSearch: false,
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
          return Resolver.get('/design');
        }]
      }

    })

    .when('/ux', {
      templateUrl: bs.tplsPath + '/projects.html',
      controller: 'ProjectsCtrl',

      resolve: {
        "page" : ['Resolver', function (Resolver) {
          return Resolver.get('/ux');
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