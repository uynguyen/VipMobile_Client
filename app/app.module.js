'use strict';
var angularController = angular.module('vipmobile.controllers', ['ui-rangeSlider','ui.bootstrap'])
.constant('DOMAIN','http://localhost:8080/java_he_thong_phan_tan');

var appService = angular.module('vipmobile.services',[]);
var appDirective = angular.module('vipmobile.directives',[]);
var appInterceptor = angular.module('vipmobile.interceptors',[]);

var app = angular.module('vipmobile', [
	'ui.router',
	'vipmobile.services',
    'vipmobile.controllers',
	'vipmobile.interceptors',
    'vipmobile.directives'
]);



app.run(function ($rootScope, $window, AuthenticationService) {
  	AuthenticationService.check();
	$rootScope.isGuest = true;
        $rootScope.$on('$stateChangeStart',
            function(evt, toState, toParams, fromState, fromParams) {
                // We can prevent this state from completing
				if ((toState.access && toState.access.requiredLogin) && !AuthenticationService.isLogged) {
					evt.preventDefault();
			     $rootScope.isLoginCollapse = false;
				 $rootScope.isGuest = true;
			    } else {
			      if (!AuthenticationService.user)
				  AuthenticationService.user = AuthenticationService.getCurrentUser();

			    }
            });

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){

            });

});
