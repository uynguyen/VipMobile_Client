'use strict';

angular.module('vipmobile.services')
    .service('AuthenticationService', ['$window', '$rootScope', function($window, $rootScope) {

        var auth = this;

        auth.isLogged = false;
        auth.user = {};
        auth.check = function() {
            if ($window.localStorage['token'] && $window.localStorage['user']) {
                auth.isLogged = true;
            } else {
                auth.isLogged = false;
                delete auth.user;
            }
        };

    //    auth.userRole = 'guest';
        auth.getCurrentUser = function(){
            if (auth.isLogged)
                return angular.fromJson($window.localStorage.user);
            return null;
        };

        auth.setCurrentUser = function(user){
            auth.user = user;
            $window.localStorage.user = angular.toJson(user);
        };

        auth.saveToken =  function(access_token){
            $window.localStorage.token = angular.toJson(access_token);
        };

    }]);
