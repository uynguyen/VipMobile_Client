/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/29/15
 * Time: 2:41 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

angularController
    .controller('HeaderController', ['$scope','$http','$window', function($scope, $http, $window) {
    $scope.isUserLoggedIn = true;

}]);
