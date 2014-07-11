(function (bs) {

  var app = angular.module('app');

  /**
   * Philosophy Controller
   */
  app.controller('PhilCtrl',
  ['$scope', '$location', '$routeParams', 'Page',
  function ($scope, $location, $routeParams, Page) {
    var location = $location.path(),
        splitLoc = location.split('/'),
        name = $routeParams.name || null,
        nid = $scope.nidsMap['/' + splitLoc[1]];

    //console.log($scope.nidsMap);

    Page.get({'nid':nid}, function (page) {
      $scope.page.nid = nid;
      $scope.node = page.node;
      $scope.outputHtml = "<h1>" + page.node.title + "</h1>" + page.node.body.safe_value;
      $scope.slider = page.node.composed_fields.field_philosophy_slider;
    });

    $scope.compareToName = function (title) {
      if (name) {
        return name.toLowerCase() === title.toLowerCase();
      } else {
        //when no name param always return true
        return true;
      }
    };


  } ]);

})(bootstrap);