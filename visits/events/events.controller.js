(function () {
    'use strict';

    function eventsPersonController($scope, $state, $stateParams, eventsPersonService) {
        var _vm = this;
        
        _vm.getEventsByNodeName;
        _vm.getVisitByAggregation;

        eventsPersonService.getEventsByNodeName($stateParams.id, $stateParams.nodeName, function (res) {
            _vm.getEventsByNodeName = res.events;
        });

        eventsPersonService.getVisitByAggregation($stateParams.id, $stateParams.nodeName, function (res) {
            _vm.getVisitByAggregation = res;
        });
        eventsPersonService.getProvidersAgg($stateParams.id, $stateParams.nodeName, function (res) {
            _vm.providersAgg = res;
        });
    }

    angular
        .module('personVisits')
        .controller('eventsPersonController', eventsPersonController);
})();

