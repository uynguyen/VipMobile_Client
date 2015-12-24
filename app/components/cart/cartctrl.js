'use strict';


angularController

  .controller('CartCtrl', ['$scope', 'CartService', function($scope, cartService) {
      $scope.cart = cartService.cartItems;
      console.log($scope.cart);
      $scope.addToCart = cartService.addToCart;
      $scope.updateCart = cartService.updateCart;
      $scope.removeFromCart = cartService.removeFromCart;
  }]);
