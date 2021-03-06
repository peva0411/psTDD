﻿'use strict';

var app = angular.module('ratings');

app.controller('EventListController', ['$scope', '$state', 'EventsService', controller]);

function controller($scope, $state, eventsService) {
    $scope.loading = true;
    $scope.getAllEvents = function() {
        eventsService.getAllEvents().then(function(events) {
            $scope.events = events;
        }).finally(function() {
            $scope.loading = false;
        });
    };

    $scope.selectEvent = function(id) {
        $state.go('eventDetails', { eventId: id });
    };

    $scope.getAllEvents();
}