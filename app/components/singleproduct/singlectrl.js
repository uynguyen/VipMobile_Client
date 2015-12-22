/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/20/15
 * Time: 9:52 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';


angularController

    .controller('SingleCtrl', ['$scope', '$http','$stateParams','DOMAIN',function($scope, $http,$stateParams, domain) {
    console.log(domain);
    console.log( domain + '/product/' + $stateParams.id);
    $http.get( domain + '/product/' + $stateParams.id)
        .success(function (data, status) {

            data.product.image =  domain + data.product.image;
            $scope.selectProduct = data;
            console.log($scope.selectProduct.product.image);



        })
        .error(function (err) {
            console.log(err);
        });
}]);
