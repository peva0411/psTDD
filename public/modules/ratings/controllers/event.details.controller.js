'use strict';

angular.module('ratings').controller('EventDetailsController',
['$scope', 'EventsService', controller]);

function controller($scope, EventsService) {
    $scope.loading = true;

    $scope.getEvent = function(id) {
        EventsService.getSingleEvent(id)
            .then(function(data) {
                $scope.eventDetails = data;
            })
            .finally(function() {
            $scope.loading = false;
        });
    };
}