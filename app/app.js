

 var app = angular.module('vipmobile', [
	'ngRoute',
  'vipmobile.controllers'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', { templateUrl: 'view/home.html', controller: 'HomeCtrl', title: 'Welcome' })
      .otherwise({ redirectTo: '/home' });
  }]);
  
  
  app.run(function ($rootScope) {
    $rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
      $rootScope.title = currentRoute.title || 'Welcome!';
    });
  });