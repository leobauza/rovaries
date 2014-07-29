(function (bs) {

  var app = angular.module('app');

  app.service('Resolver', ['$http', '$q', '$timeout', '$rootScope', function ($http, $q, $timeout, $rootScope) {

    this.get = function (route) {

      var nid,
          d = $q.defer();

      nid = _.find(bs.menu.links, function (data) { return data.path === route; }).nid;

      //check that 'bootstrap' doesn't have this before doing a get request...

      $http.get('/api/page/' + nid, {
        cache: true
      })
      .success(function (data) {
        d.resolve(data);
      })
      .error(function (err) {
        d.reject(err);
      });

      return d.promise;

    };


    this.getProject = function (route) {

      var nid,
          d = $q.defer(),
          loc = route,
          base = loc.split('/')[1],
          view_name = base + '_projects',
          node_title = loc.split('/')[2];




      nid = _.find(bs.views[base][view_name], function (data) {
        return data.alias === base + '/' + node_title;
      }).nid;

      $http.get('/api/page/' + nid, {
        cache: true
      })
      .success(function (data) {
        //console.log(data.node.collections_fields);

        // _.each(data.node.collections_fields, function (fields) {
        //   fields.img = fields.img + "?v=1&cache=" + ( new Date() ).getTime();
        // });

        d.resolve(data);
      })
      .error(function (err) {
        d.reject(err);
      });

      return d.promise;

    };

    return this;

  }]);




})(bootstrap);