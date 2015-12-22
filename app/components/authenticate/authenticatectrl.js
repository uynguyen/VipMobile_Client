/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/22/15
 * Time: 12:47 AM
 * To change this template use File | Settings | File Templates.
 */
angular.module('vipmobile.controllers')

    .controller('AuthenticateCtrl', ['$scope', '$http','$stateParams', 'DOMAIN', function($scope, $http,$stateParams,domain) {

    console.log($stateParams.RegisterToken);

    $http.get(domain + '/activate/' + $stateParams.RegisterToken)
        .success(function(data,status){
            $scope.content = data.mess;
        })
        .error(function(err){
            $scope.content = err.mess;
        })
}]);
