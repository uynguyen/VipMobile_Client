'use strict';

appService.service('UserService', ['$http', '$q', 'AuthenticationService', 'DOMAIN', '$rootScope',
        function($http, $q, AuthenticationService, domain, $rootScope) {
            var userService = this;

            userService.login = function(username, password) {

                return $http.post(domain + '/user/login', {
                        username: 'username',
                        password: 'password'
                    })
                    .then(
                        function(response) {
                            var data = response.data;
                            AuthenticationService.isLogged = true;
                            AuthenticationService.setCurrentUser(data.user);
                            AuthenticationService.saveToken(data.access_token);
                            $rootScope.isGuest = false;
                            return response.data;
                        },
                        function(errResponse) {
                            console.error('Error while log in');
                            return $q.reject(errResponse);
                        }
                    );
            };

            userService.logout = function() {
                if (AuthenticationService.isLogged) {

                    AuthenticationService.isLogged = false;
                    delete AuthenticationService.user;

                    delete $window.localStorage.token;
                    delete $window.localStorage.user;
                    $rootScope.isGuest = true;
                }
            };

            userService.register = function(user) {
                return $http.post(domain + '/user/register', user)
                    .then(
                        function(response) {
                            return response.data;
                        },
                        function(errResponse) {
                            console.error('Error while register user ');
                            return $q.reject(errResponse);
                        }
                    );
            };

            userService.updateAccount = function(acc, id) {
                return $http.put(domain + '/user/update/' + id, acc)
                    .then(
                        function(response) {
                            return response.data;
                        },
                        function(errResponse) {
                            console.error('Error while update user ' + id);
                            return $q.reject(errResponse);
                        }
                    );

            };

            userService.getCurrentUser = function() {
                return AuthenticationService.getCurrentUser();
            };

        }
    ]);
