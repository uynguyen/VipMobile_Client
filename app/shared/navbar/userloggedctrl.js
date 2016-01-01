'use strict';

angularController
    .controller('UserLoggedCtrl', ['$scope', 'UserService',
    function ($scope, userService) {
            $scope.LoggedUserName =userService.getCurrentUserFullName;
    }]);
