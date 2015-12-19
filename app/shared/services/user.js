'use strict';

angular.module('vipmobile.services')
.factory('UserService', ['$http', '$q', 'BackEndService', 'AuthenticationService',
    function ($http, $q, backend, AuthenticationService, $window, $location) {

        return {
            login: function (username, password) {
                return $http.post(backend.user.login(),
                    {
                        username: username,
                        password: password
                    })
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while log in');
                            return $q.reject(errResponse);
                        }
                        );
            },

            logout: function () {
                if (AuthenticationService.isLogged) {

                    AuthenticationService.isLogged = false;
                    delete AuthenticationService.user;
                    delete AuthenticationService.userRole;

                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    delete $window.sessionStorage.userRole;

                    $location.path("/login");
                }
            },

            register: function (user) {
                return $http.post(backend.user.register(), user)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while register user ');
                            return $q.reject(errResponse);
                        }
                        );
            },

            updateAccount: function (acc, id) {
                return $http.put(backend.user.update(), acc)
                    .then(
                        function (response) {
                            return response.data;
                        },
                        function (errResponse) {
                            console.error('Error while update user ' + id);
                            return $q.reject(errResponse);
                        }
                        );
            }
        };

    }]);
