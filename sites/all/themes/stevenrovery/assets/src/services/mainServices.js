(function (bs) {
  "use strict";

  var app = angular.module('app');

  app.service('Resolver', ['$http', '$q', '$timeout', '$rootScope', function ($http, $q, $timeout, $rootScope) {

    this.get = function (route) {

      var nid,
          d = $q.defer();

      nid = _.find(bs.menu.links, function (data) { return data.path === route; }).nid;

      //check that 'bootstrap' doesn't have this before doing a get request...
      if (nid === bs.node.nid) {
        d.resolve(bs.node);
        return d.promise;
      }

      $http.get('/api/node/' + nid, {
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

    this.getProjects = function (route) {

      var nid = _.find(bs.menu.links, function (data) { return data.path === route; }).nid,
          page = {};

      page.views = {};
      page.nid = nid;

      if (route === '/design') {
        page.title = 'Design';
        page.views = bs.views.design;
      }
      if (route === '/ux') {
        page.title = 'Ux';
        page.views = bs.views.ux;
      }

      return page;
    }

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

      // console.log("on landing these are the nids");
      // console.log(nid, bs.node.nid);

      if (nid === bs.node.nid) {
        d.resolve(bs.node);
        return d.promise;
      }

      $http.get('/api/node/' + nid, {
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