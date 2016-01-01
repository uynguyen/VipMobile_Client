'use strict';


angularController

.controller('SaleProductCtrl', ['$scope', 'ProductService', 'CartService', function($scope, productService, cartService) {

   productService.getSaleProduct(1, 20).then(function(data){
       console.log(data);
       $scope.products = data;
   }).catch(function (err) {
             console.log(err);
            console.log(err.data);
         });
         $scope.addToCart = cartService.addToCart;

}]);
