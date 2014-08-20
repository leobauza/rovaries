(function (bs) {
  "use strict";

  var app = angular.module('app');

  app.directive('siteNav', function () {
    return {
      restrict: 'E',
      replace: true,
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
        $rootScope.mobile = $window.innerWidth;
      } else {
        $rootScope.mobile = null;
      }


      if ($window.innerWidth > 700 && $window.innerWidth < 960) {
        $rootScope.tablet = $window.innerWidth;
      } else {
        $rootScope.tablet = null;
      }


      angular.element($window).bind('resize', function () {
        if ($window.innerWidth <= 700) {
          $rootScope.mobile = $window.innerWidth;
        } else {
          $rootScope.mobile = null;
        }

        if ($window.innerWidth > 700 && $window.innerWidth < 960) {
          $rootScope.tablet = $window.innerWidth;
        } else {
          $rootScope.tablet = null;
        }


        $scope.$apply();

      });
    }

  }]);


  app.directive('viewParent', ['$window', function ($window) {

    function linkFunction ($scope, el, attrs) {

      el.height(0);

      attrs.$observe('viewParent', function (val) {
        if (val === 'pending') {
          el.height(0);
        }
      });
      angular.element($window).bind('resize', function () {
        var site_main = el.children();
        el.height(site_main[0].offsetHeight);
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