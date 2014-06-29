(function (bs) {

  console.log(bs);

  var app = angular.module('app', [
    'ngRoute'
  ]);

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
      .otherwise({
        //redirectTo: '/'
        template: "doesn't exist"
      });

    $locationProvider.html5Mode(true);

  } ]);


  app.controller('HomeCtrl', [ '$http', '$scope', function ($http, $scope, $sce) {
    //check that I have the right bs object
    if (bs.node && bs.node.title !== 'Home') {
      console.log("don't have the right node, I have", bs.node.title);
      $http.get('/api/page/1').success(function (data) {
        console.log(data.node.body);
        bs = data;

        $scope.page = bs.node;
        //do this in a template somehow??
        $scope.outputHtml = "<h1>" + $scope.page.title + "</h1>" + $scope.page.body.safe_value;

      });
    } else {
      $scope.page = bs.node;
      //do this in a template somehow??
      $scope.outputHtml = "<h1>" + $scope.page.title + "</h1>" + $scope.page.body.safe_value;
    }

  } ]);

  app.controller('PhilCtrl', function ($scope) {
    //check that I have the right bs object

    $scope.something = 'philosophy';
    $scope.page = bs.node;
    $scope.outputHtml = bs.node;
  });

  /**
   * Global:
   * A global controller: navigation clicks and such??
   * Some global directives: nav element, header element, footer element?
   * Some global filters too as helpers
   */

  app.controller('MenuCtrl', [ '$http', '$scope', function ($http, $scope) {
    $scope.links = bs.menu.links;

    $scope.changePage = function (node) {
      //bs.node = 'this is changing because of the click!';
      // $http.get('/api/page/' + node).success(function (data) {
      //   bs = data;
      //   console.log(data.node.body);
      // });
    };


  } ]);

  app.filter('unsafe', function ($sce) {
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  });

})(bootstrap);
