(function () {
    'use strict';

    function visitsAPI($http) {
        'use strict';
        
        var getVisitsPerson = function (euid, callback) {
            var completeURL = '/ws/mm/er/persons/EMPI/' + euid + '/aggregations';
            
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
        }

        var getEventsPerson = function (id, callback) {
            var euid = id,
                completeURL = '/ws/mm/PersonRS/sbr?euid=' + euid;

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
        }

        var getVisitsProvider = function (euid, callback) {
            var euidTest = 1000184585;
            var completeURL = '/ws/mm/er/persons/EMPI/' + euidTest + '/aggregations';

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
        }

        var getEventsProvider = function (id, callback) {
            var euid = id,
                completeURL = '/ws/mm/ProviderRS/sbr?euid=' + euid;

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
        }
       
        return {
            getVisitsPerson    : getVisitsPerson,
            getEventsPerson    : getEventsPerson,
            getVisitsProvider  : getVisitsProvider,
            getEventsProvider  : getEventsProvider
        } 
    }

    angular
        .module('mmsearch')
        .factory('visitsAPI', visitsAPI);
})();