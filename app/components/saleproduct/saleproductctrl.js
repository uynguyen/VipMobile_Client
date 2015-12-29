'use strict';


angularController

.controller('SaleProductCtrl', ['$scope', 'ProductService', 'CartService', function($scope, productService, cartService) {

   productService.getAllProducts(20, 0).then(function(data){
      $scope.products = data;
   }).catch(function (err) {
             console.log(err);
         });
         $scope.addToCart = cartService.addToCart;

}]);
