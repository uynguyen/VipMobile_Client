'use strict';

appService.service('UserService', ['$http', '$q', 'AuthenticationService', 'DOMAIN', '$rootScope', '$location',
        function($http, $q, AuthenticationService, domain, $rootScope, $location) {
            var userService = this;

            userService.login = function(loginData) {

                return $http.post(domain + '/user/login', loginData)
                    .then(
                        function(response){
                            if(response.data.mess == 'Success')
                            {
                                var data = response.data;
                                AuthenticationService.isLogged = true;
                                AuthenticationService.setCurrentUser(data.acc);
                                AuthenticationService.saveToken(data.token);
                                $rootScope.isGuest = false;
                            }


                            return response;
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
                user.callbackURL = callbackURL;
                return $http.post(domain + '/user/register', user)
                    .then(
                        function(response) {
                            return response;
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
                            console.log('Updated info ');
                            AuthenticationService.setCurrentUser(acc);
                            return response;
                        },
                        function(errResponse) {
                            console.error('Error while update password  ');
                            return $q.reject(errResponse);
                        }
                    );

            };

            userService.updatePassword = function(pass) {
                return $http.post(domain + '/user/updatePassword', pass)
                    .then(
                    function (res, status) {
                     //   console.log(res.data.mess)
                        return res;
                    },
                    function (err) {

                        console.log('err');
                        return err;
                    }
                );

            };

            userService.getCurrentUser = function() {
                return AuthenticationService.getCurrentUser();
            };

            userService.getCurrentUserFullName = function() {
                var user = userService.getCurrentUser();
                return user && user.fullName || "";
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

            userService.sendRequestResetPass = function(emailuser){
                var callbackURL = $location.protocol() + "://" + $location.host() + ":" + $location.port()
                    + "/#/resetpass/";
                console.log(callbackURL);
                var object = {
                    email : emailuser,
                    callback: callbackURL
                };
                return $http.post(domain + '/user/requestResetPass', object)
                    .success(function(data,status){
                        console.log('Success');
                        return data;
                    })
                    .error(function(err){
                        console.log('Arr in service');
                        return err;
                    })
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
            userService.resetPass = function(data,token){

                return $http.post(domain + '/user/resetPass/' + token, data)
                    .success(function(res,status){
                        console.log('Reseted pass in service');
                        return res;
                    })
                    .error(function(err){
                        console.log('Reseted pass error in service');
                        return err;
                    })

            };

            userService.cancelBill = function(id){
                console.log(domain + '/deleteMyBill/' + id);
                return $http.get(domain + '/bill/deleteMyBill/' + id).then(
                    function(res){
                        console.log(res);
                        console.log('Cancel bill success');
                        return res;
                    },
                    function(err){
                         console.log('Cancel bill error');
                         return $q.reject(err);
                });


            }



        }
    ]);
