(function () {

  var app = angular.module('app');

  app.animation('.site__main', ['$rootScope', '$location', '$timeout', function ($rootScope, $location, $timeout) {

    var isNextPhilosophy, isCurrentPhilosophy;
    isCurrentPhilosophy = _.contains($location.path().split('/'), 'philosophy');

    $rootScope.$on('$viewContentLoaded', function (event) {
      //$rootScope.animationAux = 'loaded';
    });

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      //start a class to be taken off by $viewContentLoaded
      //$rootScope.animationAux = 'pending';

      var parts = next.split('/');
      isCurrentPhilosophy = _.contains(current.split('/'), 'philosophy');
      isNextPhilosophy = _.contains(parts, 'philosophy');


      if (isNextPhilosophy && isCurrentPhilosophy) {

        $rootScope.animationClass = 'animate--phil';

      } else if (isNextPhilosophy && !isCurrentPhilosophy){

        $timeout(function () {
          $rootScope.animationClass = 'animate--transition-in';
        }, 500);

      } else if (!isNextPhilosophy && isCurrentPhilosophy) {

        $rootScope.animationClass = 'animate';

      } else {

        //$rootScope.animationClass = 'animate';

      }

    });

    if (isCurrentPhilosophy) {
      $rootScope.animationClass = 'animate--phil';
    } else {
      $rootScope.animationClass = 'animate';
    }

    return {
      enter: function (element, done) {
        element.addClass('hide');
        $timeout(function () {
          element.removeClass('hide');
        }, 500);
      },
      leave: function (element, done) {

        if (!isNextPhilosophy && isCurrentPhilosophy) {
          element.addClass('animate');
          element.removeClass('animate--phil animate--transition-in');
        }

        done();
      }



    };

  }]);

})();