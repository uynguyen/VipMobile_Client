'use strict';

var app = angular.module('vipmobile');

app.factory('Authentication', function($window) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    },
    userRole: 'admin'
  };
 
  return auth;
});