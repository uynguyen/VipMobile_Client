'use strict';

angular.module('vipmobile.controllers', ['vipmobile.services'])
.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserService', 'AuthenticationService',
  function($scope, $window, $location, UserService, AuthenticationService) {
    $scope.user = {
      username: 'arvind@myApp.com',
      password: 'pass123'
    };

    $scope.login = function() {

      var username = $scope.user.username,
        password = $scope.user.password;

      if (username !== undefined && password !== undefined) {
        UserService.login(username, password).success(function(data) {

          Authentication.isLogged = true;
          Authentication.user = data.user.username;
          Authentication.userRole = data.user.role;

          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
          $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

          $location.path("/");

        }).error(function(status) {
          alert('Oops something went wrong!');
        });
      } else {
        alert('Invalid credentials');
      }

    };

  }
]);
