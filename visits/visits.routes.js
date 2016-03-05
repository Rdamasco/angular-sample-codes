(function () {
  'use strict';

  angular.module('personVisits')
    .config(function ($stateProvider) {
      $stateProvider
        // person 
        .state('search.person.visits', 
            {
                url: '/visits',
                controller: 'visitsPersonController as visitsPersonController',
                templateUrl: '/eventrel-ui/components/search/person/visits/visitsView.html'
            })
        .state('search.person.visits.events', 
            {
                url: '/events/:nodeName',
                controller: 'eventsPersonController as eventsPersonController',
                templateUrl: '/eventrel-ui/components/search/person/visits/events/eventsView.html'
            })
    })
})();

