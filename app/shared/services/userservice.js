'use strict';

appService.service('UserService', ['$http', '$q', 'AuthenticationService', 'DOMAIN', '$rootScope',
        function($http, $q, AuthenticationService, domain, $rootScope) {
            var userService = this;

            userService.login = function(loginData) {

                return $http.post(domain + '/user/login', loginData)
                    .then(
                        function(response) {
                            var data = response.data;
                            AuthenticationService.isLogged = true;
                            AuthenticationService.setCurrentUser(data.acc);
                            AuthenticationService.saveToken(data.token);
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

                    AuthenticationService.logout();

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

            userService.getUserBills = function(page, limit) {
                return $http.get(domain + '/bill/getMyBill/' + page + '/' + limit)
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
        }
    ]);
