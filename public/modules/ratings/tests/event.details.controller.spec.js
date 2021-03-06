﻿'use strict';

describe('Event Details Controller', function() {
	var EventsService,
		$rootScope,
		serviceSpy,
		deferred,
		$state,
		$q,
		scope;

	beforeEach(module(ApplicationConfiguration.applicationModuleName));

	beforeEach(module(function ($provide) {
		EventsService = {
			getSingleEvent: function () { }
		};
		$provide.value('EventsService', EventsService);
	}));

	beforeEach(inject(function (_$rootScope_, $controller, _$q_, $httpBackend, _$state_) {
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();

		$httpBackend.whenGET('modules/core/views/home.client.view.html').respond(200);

		$state = _$state_;
		spyOn($state, 'go');

		$q = _$q_;

		deferred = $q.defer();
		spyOn(EventsService, 'getSingleEvent').and.returnValue(deferred.promise);

		$controller('EventDetailsController', {
			$scope: scope
		});
	}));

	describe('Scope', function() {
		it('Should initialize loading to true', function() {
			expect(scope.loading).toBeTruthy();
		});
	});

	describe('Fetching data', function() {
		it('Should make a call to the service', function() {
			scope.getEvent(1);
			expect(EventsService.getSingleEvent).toHaveBeenCalled();
		});

	    it('Should set loading to false when done', function() {
	        scope.getEvent(1);
	        deferred.resolve();
	        $rootScope.$digest();

	        expect(scope.loading).toBeFalsy();
	    });
	    it('Should set the event details', function() {
	        scope.getEvent(1);
	        deferred.resolve({ name: 'test event' });
	        $rootScope.$digest();

	        expect(scope.eventDetails.name).toEqual('test event');
	    });

	});



});