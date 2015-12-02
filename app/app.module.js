'use strict';

 var app = angular.module('vipmobile', [
	'ui.router',
  'vipmobile.controllers'
]);



app.run(function ($rootScope, $window, $location) {
//   Authentication.check();

//   $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
//   if ((nextRoute.access && nextRoute.access.requiredLogin) && !Authentication.isLogged) {
//     $location.path("/login");
//   } else {
//     if (!Authentication.user) Authentication.user = $window.sessionStorage.user;
//     if (!Authentication.userRole) Authentication.userRole = $window.sessionStorage.userRole;
//   }
// });

  $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
    $rootScope.title = currentRoute.title || 'Welcome!';
  //   $rootScope.showMenu = Authentication.isLogged;
  //   $rootScope.role = Authentication.userRole;

  // if (Authentication.isLogged == true && $location.path() == '/login') {
  //   $location.path('/');
  // }
  });
});
