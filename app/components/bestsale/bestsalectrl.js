'use strict';


angularController

  .controller('BestSaleCtrl', ['$scope', 'ProductService', 'CartService', function($scope, productService, cartService) {

     productService.getBestSaleProduct(1, 15).then(function(data){
         console.log(data);
        $scope.products = data;
     }).catch(function (err) {
               console.log(err);
           });
           $scope.addToCart = cartService.addToCart;

  }]);
