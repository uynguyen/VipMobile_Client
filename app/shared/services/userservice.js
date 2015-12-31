'use strict';

appService.service('UserService', ['$http', '$q', 'AuthenticationService', 'DOMAIN', '$rootScope', '$location',
        function($http, $q, AuthenticationService, domain, $rootScope, $location) {
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
                var callbackURL = $location.protocol() + "://" + $location.host() + ":" + $location.port()
                    + "/#/authenticate/";
                console.log(callbackURL);
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

            userService.updateAccount = function(acc) {
                return $http.post(domain + '/user/updateInfo', acc)
                    .then(
                        function(response) {
                            console.log('Update success user ');
                            AuthenticationService.setCurrentUser(acc);
                            return response;
                        },
                        function(errResponse) {
                            console.error('Error while update user ');
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

            userService.activateUser = function(token){

                  return $http.get(domain + '/user/activate/' + token)
                    .success(function(data,status){
                        console.log('Activate in service');
                    })
                    .error(function(err){
                          console.log('Arr in service');
                    })

            };
        }
    ]);
