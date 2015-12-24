'use strict';


angularController
  .controller('ProductCtrl', ['$scope', '$http', 'CartService', 'ProductService',
  function($scope, $http, cartService, productService) {

      $scope.products = [];
      productService.getAllProducts(12, 0).then(function(data){
          $scope.products = data;
      }).catch(function(err){
          console.log(err);
      });

      $scope.addToCart = cartService.addToCart;
  }]);
