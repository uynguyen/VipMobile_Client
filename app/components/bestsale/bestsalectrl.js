'use strict';


angularController

  .controller('BestSaleCtrl', ['$scope', 'ProductService', 'CartService', function($scope, productService, cartService) {
    console.log("get best sale");
     productService.getBestSaleProduct(1, 15).then(function(data){
         console.log(data);
        $scope.products = data;
    }, function(error){
        console.log(error);
    });
           $scope.addToCart = cartService.addToCart;

  }]);
