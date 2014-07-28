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
        $rootScope.mobile = true;
      } else {
        $rootScope.mobile = null;
      }

      angular.element($window).bind('resize', function () {
        if ($window.innerWidth <= 700) {
          console.log("mobile true");
          $rootScope.mobile = true;
        } else {
          console.log("mobile false");
          $rootScope.mobile = null;
        }

        $scope.$apply();

      });
    }



  }]);


})(bootstrap);