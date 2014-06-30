(function (bootstrap) {

  var appServices = angular.module('appServices', ['ngResource']);

  appServices.factory('Page',
  ['$resource',
  function ($resource) {

    return $resource('/api/page/:nid');

  } ]);


})(bootstrap);