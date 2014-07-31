(function () {

  var app = angular.module('app');

  app.animation('.site__main',
  ['$rootScope', '$location', '$timeout', '$q',
  function ($rootScope, $location, $timeout, $q) {

    var isNextPhilosophy, isCurrentPhilosophy;
    isCurrentPhilosophy = _.contains($location.path().split('/'), 'philosophy');

    // if (isCurrentPhilosophy) {
    //   $rootScope.animationClass = 'animate--phil';
    // } else {
    //   $rootScope.animationClass = 'animate';
    // }


    /**
     * Router has started changing the url
     */
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      //start a class to be taken off by $viewContentLoaded
      $rootScope.animationAux = 'pending';

      // var parts = next.split('/');
      // isCurrentPhilosophy = _.contains(current.split('/'), 'philosophy');
      // isNextPhilosophy = _.contains(parts, 'philosophy');
      //
      //
      // if (isNextPhilosophy && isCurrentPhilosophy) {
      //
      //   $rootScope.animationClass = 'animate--phil';
      //
      // } else if (isNextPhilosophy && !isCurrentPhilosophy){
      //
      //   $timeout(function () {
      //     $rootScope.animationClass = 'animate--transition-in';
      //   }, 500);
      //
      // } else if (!isNextPhilosophy && isCurrentPhilosophy) {
      //
      //   $rootScope.animationClass = 'animate';
      //
      // } else {
      //
      //   //$rootScope.animationClass = 'animate';
      //
      // }

    });

    /**
     * View content has been loaded
     */
    $rootScope.$on('$viewContentLoaded', function (event) {
      // $timeout(function () {
      //   $rootScope.animationAux = null;
      // }, 500)
    });


    return {
      enter: function (element, done) {

        var imgs = jQuery(element).find('.project-row__image');

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
            element.parent().height(0);
            $timeout(function () {
              element.parent().height(height);
              $rootScope.animationAux = null;
            }, 500);
          });

        } else {

          var height = element[0].offsetHeight
          element.parent().height(0);
          $timeout(function () {
            element.parent().height(height);
            $rootScope.animationAux = null;
          }, 500);

        }


        // element.addClass('hide');
        // $timeout(function () {
        //   element.removeClass('hide');
        // }, 500);

      },
      leave: function (element, done) {

        // var height = element[0].offsetHeight
        //console.log(height);
        // element.height(height);
        element.height(0);


        // if (!isNextPhilosophy && isCurrentPhilosophy) {
        //   element.addClass('animate');
        //   element.removeClass('animate--phil animate--transition-in');
        // }

        done();
      }

    };

  }]);

})();