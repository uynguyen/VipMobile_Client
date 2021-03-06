'use strict';

appDirective.directive('titleUpdate', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {
          $timeout(function() {
            $rootScope.title = 'VIP Mobile - ' + (toState.title || 'Welcome!');
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
