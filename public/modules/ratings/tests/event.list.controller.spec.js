'use strict';

describe('Event List Controller', function() {
    var EventsService,
        $rootScope,
		serviceSpy,
		deferred,
		$state,
        $q,
        scope;

    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    beforeEach(module(function($provide) {
        EventsService = {
            getAllEvents: function() {}
        };
        $provide.value('EventsService', EventsService);
    }));

	beforeEach(inject(function(_$rootScope_, $controller, _$q_, $httpBackend, _$state_) {
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();

	    $httpBackend.whenGET('modules/core/views/home.client.view.html').respond(200);

	    $state = _$state_;
	    spyOn($state, 'go');

		$q = _$q_;

		deferred = $q.defer();
		spyOn(EventsService, 'getAllEvents').and.returnValue(deferred.promise);

		$controller('EventListController', {
			$scope: scope
		});
	}));

	describe('Fetching events', function () {
	   
		function sendDataFromService() {
			deferred.resolve([{ name: 'event test' }]);
			$rootScope.$digest();
		}

		it('Should populate events list from service', function() {

			scope.getAllEvents();
		    sendDataFromService();
		    expect(scope.events[0].name).toEqual('event test');
		});

	    it('Should set loading to false when data comes back', function() {

	        scope.getAllEvents();

	        scope.loading = true;
	        sendDataFromService();
	        expect(scope.loading).toBeFalsy();
	    });

	    it('Should set loading to false when service fails', function() {
	    	scope.getAllEvents();
	    	scope.loading = true;

	    	deferred.reject();
	    	$rootScope.$digest();

	        expect(scope.loading).toBeFalsy();
	    });
	});

    describe('Controller Scope', function() {
        it('Should initialize loading to true', function() {
            expect(scope.loading).toBeTruthy();
        });
    });

    describe('When loading controller', function() {
        it('Should fetch events', function() {
            expect(EventsService.getAllEvents).toHaveBeenCalled();
        });
    });

    describe('When selecting an item', function() {
        it(' Should navigate to the detail state', function() {
        	scope.selectEvent(1);
            expect($state.go).toHaveBeenCalledWith('eventDetails', { eventId: 1 });
        });
    });
});