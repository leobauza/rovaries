(function (bootstrap) {

  var app = angular.module('app');

  /**
   * API Services
   */
  app.factory('Page',
  ['$resource',
  function ($resource) {

    return $resource('/api/page/:nid');

  } ]);

  /**
   * Non API Services
   */
  


})(bootstrap);