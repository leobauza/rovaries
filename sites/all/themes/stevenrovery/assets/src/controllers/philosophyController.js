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

    //console.log($scope.nidsMap);

    Page.get({'nid':nid}, function (page) {

      //update node id for navigation
      $scope.setNid(nid);
      //root scope stuff...move into servie as well...
      $scope.setSiteTitle(page.node.title);

      //$rootScope.siteTitle = bs.siteTitle + ' | ' + page.node.title;

      //$scope.node = page.node;
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