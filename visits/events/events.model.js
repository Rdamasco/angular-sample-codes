(function () {
    'use strict';

    function eventsPersonService (eventsAPI, searchAPI) {     
        this.getEventsByNodeName = function (euid, nodeName, callback) {  
            eventsAPI.getEventsByNodeName(euid, nodeName, function (response) {
                callback(response);
            });
        }
        this.getVisitByAggregation = function (euid, nodeName, callback) {
            eventsAPI.getVisitByAggregation(euid, nodeName, function (response) {
                callback(response);
            });
        }
        this.getProvidersAgg = function (euid, nodeName, callback) {
            eventsAPI.getProvidersForAggregation(euid, nodeName, function (response) {
                var data = response.aggregationRelations,
                    results = [];

                for (var prop in data) {
                    results.push(data[prop][0]);
                }
                for (var ii = 0; ii < results.length; ii++) {
                    (function (ii) {
                        searchAPI.getProviderSBR(results[ii].euid, function (res) {
                            if (res.Provider.hasOwnProperty('Communications')) {
                                results[ii]['phone'] = res.Provider.Communications[0].CommAddr1;
                            } 
                            if (res.Provider.hasOwnProperty('Specialties')) {
                                    results[ii]['specialty'] = [];
                                    results[ii]['specialty'].push(res.Provider.Specialties[0]);
                            }
                            if (ii == results.length-1) {
                                callback(results);
                            }
                        });
                    })(ii);
                }
            });
        }
    }

    angular
        .module('personVisits')
        .service('eventsPersonService', eventsPersonService);
})();

