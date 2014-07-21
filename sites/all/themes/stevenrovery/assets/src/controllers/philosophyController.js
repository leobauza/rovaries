(function (bs) {

  var app = angular.module('app');

  /**
   * Philosophy Controller
   */
  app.controller('PhilCtrl',
  ['$scope', '$location', '$routeParams', 'Page', '$rootScope',
  function ($scope, $location, $routeParams, Page, $rootScope) {

    var location = $location.path(),
        splitLoc = location.split('/'),
        name = $routeParams.name || null,
        nid = $scope.getNid('/' + splitLoc[1]);


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