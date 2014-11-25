'use strict';

var app = angular.module('ratings');

app.factory('EventsService', ['$resource', '$q', eventsService]);

function eventsService($resource, $q) {
    return {
        getAllEvents: function() {

            var deferred = $q.defer();

            $resource('http://localhost:3000/events').query()
            .$promise
            .then(function(data) {
                    deferred.resolve(data);
                })
            .catch(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        getSingleEvent: function (id) {
            var deferred = $q.defer();

            $resource('http://localhost:3000/events/' + id).get()
            .$promise
            .then(function(data) {
                    deferred.resolve(data);
                })
            .catch(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    };
}