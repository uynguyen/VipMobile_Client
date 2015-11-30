

 var app = angular.module('vipmobile', [
	'ngRoute',
  'vipmobile.controllers'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', { templateUrl: 'view/home.html', controller: 'HomeCtrl', title: 'Welcome' })
      //.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl', title: 'Login' })
      .otherwise({ redirectTo: '/home' });
  }]);
  
  
  
  app.run(function ($rootScope) {
    $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
      //Change page title, based on Route information
      $rootScope.title = currentRoute.title || 'Welcome!';
    });
  });