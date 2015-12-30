/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/29/15
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('vipmobile.directive', []);
app.factory('sessionInjector',['$window', function($window) {
    var sessionInjector = {
        request: function(config)
        {
            var token = $window.localStorage['token'];
            if(token) // If token exist
            {
                config.headers.Authorization = 'Bearer '+ token;
                console.log('Bearer '+ token);
            }

            return config;
        }
    };
    return sessionInjector;
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);