(function (bootstrap) {

  var app = angular.module('app');

  app.factory('Page',
  ['$resource',
  function ($resource) {

    return $resource('/api/page/:nid');

  } ]);


})(bootstrap);