'use strict';

angular.module('awesome-app.common.features.members', [

]).provider('Members', function () {

    var collectionUrl = '';
        
    var members = {};

    return {

      setUrl: function(url) {
        collectionUrl = url;
      },

      $get: function($http, $q) {

        var _init = function() {
            return $http.get(collectionUrl).success(function(response) {            
                angular.forEach(response, function(item) {
                    _add(item);
                });
            });
        };

        var _add = function(member) {
            members[member.id] = member;
            return this;
        };

        var _get = function(id) {
            return members[id];
        };

        var _list = function() {
            var result = [];
                for(var property in members) {
                    if (members.hasOwnProperty(property)) {
                        result.push(members[property]);
                    };
                };
            return result;
        };

        var _delete = function(id) {
            var deferred = $q.defer();
            delete members[id];
            deferred.resolve();
            return deferred.promise;
        };

        return {
            init : _init,
            add : _add,
            get : _get,
            list : _list,
            delete : _delete
        }        
       }
    }
});