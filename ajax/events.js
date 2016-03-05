(function () {
    'use strict';

    function eventsAPI($http) {
        'use strict';
        
        var getEventsByNodeName = function (euid, nodeName, callback) {
            var completeURL = '/ws/mm/er/persons/EMPI/' + encodeURIComponent(euid) + '/aggregations/' + encodeURIComponent(nodeName) + '/events';
            
            $http({
                method: 'GET',
                url: completeURL
            }).
            success(function (data, status, headers, config) {
                if (!!callback) {
                    callback(data, status);
                }
            }).
            error(function (data, status, headers, config) {
                if (!!callback) {
                    bootbox.alert("Request failed with status " + status);
                    callback([], status);
                }
            });
        };
        
        var getVisitByAggregation = function (euid, nodeName, callback) {
            var completeURL = '/ws/mm/er/persons/EMPI/' + encodeURIComponent(euid) + '/aggregations/' + encodeURIComponent(nodeName);
            
            $http({
                method: 'GET',
                url: completeURL
            }).
            success(function (data, status, headers, config) {
                if (!!callback) {
                    callback(data, status);
                }
            }).
            error(function (data, status, headers, config) {
                if (!!callback) {
                    bootbox.alert("Request failed with status " + status);
                    callback([], status);
                }
            });
        };

        var getProvidersForAggregation = function (euid, nodeName, callback) {
            var completeURL = '/ws/mm/er/persons/EMPI/' + encodeURIComponent(euid) + '/aggregations/' + encodeURIComponent(nodeName) + '/relations';
            
            $http({
                method: 'GET',
                url: completeURL
            }).
            success(function (data, status, headers, config) {
                if (!!callback) {
                    callback(data, status);
                }
            }).
            error(function (data, status, headers, config) {
                if (!!callback) {
                    bootbox.alert("Request failed with status " + status);
                    callback([], status);
                }
            });
        };
       
        return {
            getEventsByNodeName        :  getEventsByNodeName,
            getVisitByAggregation      :  getVisitByAggregation,
            getProvidersForAggregation :  getProvidersForAggregation
        };
    }

    angular
        .module('mmsearch')
        .factory('eventsAPI', eventsAPI);
})();
