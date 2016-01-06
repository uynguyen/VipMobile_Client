/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/20/15
 * Time: 9:52 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';


angularController
    .controller('SingleCtrl', ['$scope', '$http','$stateParams', '$window','ProductService', 'CartService',
    function($scope, $http,$stateParams, $window, productService, cartService) {

        productService.getProduct($stateParams.id).then(function(data){
            $scope.selectProduct = data;
        });

        $scope.addToCart = cartService.addToCart;

        $scope.slides = [
            {
                id: 0,
                active: true,
                image: 'http://placehold.it/800x300'
            },
            {
                id: 1,
                image: 'http://placehold.it/800x300'
            }
        ];
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;

        socket.on('watch product', function(data){
            if (data.product_id == $stateParams.id)
                $scope.watchpeople = data.number;
        });

        $window.onbeforeunload = function() {
            socket.emit('watch product', {
                type: 'unwatch',
                product_id: $stateParams.id
            });
        }
    }]);
