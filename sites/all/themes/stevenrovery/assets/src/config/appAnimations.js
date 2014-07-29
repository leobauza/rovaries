(function () {

  var app = angular.module('app');

  app.animation('.site__main', ['$rootScope', '$location', '$timeout', function ($rootScope, $location, $timeout) {

    var isNextPhilosophy, isCurrentPhilosophy;
    isCurrentPhilosophy = _.contains($location.path().split('/'), 'philosophy');

    if (isCurrentPhilosophy) {
      $rootScope.animationClass = 'animate--phil';
    } else {
      $rootScope.animationClass = 'animate';
    }


    /**
     * Router has started changing the url
     */
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      //start a class to be taken off by $viewContentLoaded
      $rootScope.animationAux = 'pending';

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

    /**
     * View content has been loaded
     */
    $rootScope.$on('$viewContentLoaded', function (event) {
      $rootScope.animationAux = null;
    });


    return {
      enter: function (element, done) {

        // var height = element[0].offsetHeight

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