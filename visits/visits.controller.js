(function () {
    'use strict';

    function visitsPersonController($scope, $state, $stateParams, visitsPersonService, $anchorScroll, $location) {
        var _vm = this;

        _vm.patient = {};
        _vm.years = [];
        _vm.loading = true;

        _vm.gotoAnchor = function (x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('anchor' + x);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
         };

        visitsPersonService.getVisits($stateParams.id, function (res) {
            var data = res;
            _vm.visitsPerson = data;
            _vm.loading = false;
        });

        _vm.checkApplicable = function (str) {
            if (str == 'NOTAPPLICABLE') {
                _vm.hideThisRow = true;
            } else {
                _vm.hideThisRow = false;
                return str;
            }
        }

        _vm.splitStrByDot = function (str, num) {
            if (!!str) {
                var string = str,
                    res = string.split(".");
                return res[num];
            }
        }
    }

    angular
        .module('personVisits')
        .controller('visitsPersonController', visitsPersonController);
})();

