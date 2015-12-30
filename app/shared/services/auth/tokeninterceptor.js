'use strict';

angular.module('vipmobile.interceptors')
    .service('TokenInterceptor', ['$q', 'AuthenticationService', function($q, authService) {
        var service = this;

        service.request = function(config) {
            config.headers = config.headers || {};
            var currentUser = authService.getCurrentUser();
            var access_token = currentUser ? currentUser.access_token : null;
            if (access_token) {
                config.headers['Authorization'] = 'Bearer ' + access_token;
            }

            return config || $q.when(config);
        };

        service.response = function(response) {
            return response || $q.when(response);
        };

        // service.responseError = function(response) {
        //     if (response.status === 401) {
        //         $rootScope.$broadcast('unauthorized');
        //     }
        //     return response;
        // };

    }]);
