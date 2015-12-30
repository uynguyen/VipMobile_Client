/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/22/15
 * Time: 12:47 AM
 * To change this template use File | Settings | File Templates.
 */
angular.module('vipmobile.controllers')

    .controller('AuthenticateCtrl', ['$scope', '$http','$stateParams','$location','UserService',
    function($scope, $http,$stateParams,$location, userService) {

     var token = $stateParams.RegisterToken;

        var callbackURL = $location.protocol() + "://" + $location.host() + ":" + $location.port()
            + "/#/authenticate/";
        console.log(callbackURL);
        console.log(token);
        userService.activateUser(token)
            .then(function(res){
               console.log(res.data.mess);
                $scope.content = res.data.mess;

            }).catch(function (err) {
                console.log(err);
            });

}]);
