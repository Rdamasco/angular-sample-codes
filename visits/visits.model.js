(function () {
    'use strict';

    function visitsPersonService (visitsAPI, $filter) {      
        
        this.getVisits = function (euid, callback) {
            
            visitsAPI.getVisitsPerson(euid, function (response, status) {
                var aggregations = response.aggregations,
                    yearArr = [],
                    dataArr = [],
                    dataObjArr = [];
            
                for (var ii = 0; ii < aggregations.length; ii++) {
                    if (yearArr.length == 0) {           
                        if (aggregations[ii].patClass != 'NOTAPPLICABLE') {
                            yearArr.push(searchUtils.getYearByMili(aggregations[ii].eventTime));
                        }
                    } else {
                        for (var ww = 0; ww < yearArr.length; ww++) {
                            if (yearArr.indexOf(searchUtils.getYearByMili(aggregations[ii].eventTime)) == -1) {
                                if (aggregations[ii].patClass != 'NOTAPPLICABLE') {
                                    yearArr.push(searchUtils.getYearByMili(aggregations[ii].eventTime));
                                }
                            } 
                        }
                    }
                    yearArr.sort(function(a, b){return b-a});
                    dataArr.push(aggregations[ii]);
                }    
                // build an object with corresponding year and months
                for (var kk = 0; kk < yearArr.length; kk++) {
                    dataObjArr.push(
                        {
                            year                    : yearArr[kk],
                            months                  : [],
                            filteredMonths          : [], // with duplicates
                            filteredMonthsObj       : {}, // with value removed duplicates
                            filteredMonthsCount     : [], // value of number of months
                            filterMonthsInOrder     : []  // removed duplicates, in order of month
                        }
                    )
                }
                for (var cc = 0; cc < dataObjArr.length; cc++) {
                    // inserting month to the year
                    for (var tt = 0; tt < dataArr.length; tt++) {
                        if (dataObjArr[cc].year == searchUtils.getYearByMili(dataArr[tt].eventTime)) {
                            dataObjArr[cc].months.push(dataArr[tt]);
                            dataObjArr[cc].months.sort(function(a, b) {return b.eventTime - a.eventTime});
                        }
                    }
                    // get number of month in months
                    for (var uu = 0; uu < dataObjArr[cc].months.length; uu++) {
                        dataObjArr[cc].filteredMonths.push(
                            dataObjArr[cc].months[uu].eventTime
                        );
                        dataObjArr[cc].filteredMonths[uu] = $filter('date')(dataObjArr[cc].filteredMonths[uu], 'MMMM');
                    }
                    // creating object, getting/incrementing values
                    for (var dd = 0; dd < dataObjArr[cc].filteredMonths.length; dd++) { 
                        if (!dataObjArr[cc].filteredMonthsObj.hasOwnProperty(dataObjArr[cc].filteredMonths[dd])) {
                            dataObjArr[cc].filteredMonthsObj[dataObjArr[cc].filteredMonths[dd]] = 1;
                        } else {
                            dataObjArr[cc].filteredMonthsObj[dataObjArr[cc].filteredMonths[dd]] += 1;
                        }
                        // removing duplicates from array
                        $.each(dataObjArr[cc].filteredMonths, function (i, el) {
                            if ($.inArray(el, dataObjArr[cc].filterMonthsInOrder) === -1) {
                                dataObjArr[cc].filterMonthsInOrder.push(el);
                            }
                        });
                    }
                    // removed duplicates and combining values
                    for (var ff = 0; ff < dataObjArr[cc].filterMonthsInOrder.length; ff++) { 
                        for (var prop in dataObjArr[cc].filteredMonthsObj) {
                            if (prop == dataObjArr[cc].filterMonthsInOrder[ff]) {
                                dataObjArr[cc].filteredMonthsCount.push(dataObjArr[cc].filteredMonthsObj[prop]);
                            } 
                        }
                    }
                }
                callback(dataObjArr);
            });
        }
    }

    angular
        .module('personVisits')
        .service('visitsPersonService', visitsPersonService);
})();

