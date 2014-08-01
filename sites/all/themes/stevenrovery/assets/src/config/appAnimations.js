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