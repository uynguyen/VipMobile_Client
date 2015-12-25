'use strict';


angularController

  .controller('CartCtrl', ['$scope', 'CartService', function($scope, cartService) {
     cartService.getItems(function(cart){
           $scope.cart = cart.items;
      });

      $scope.updateCart = function(productid, quantity){
          if (quantity == null || quantity == "undefined")
            quantity = 1;
          cartService.updateCart(productid, quantity);
          cartService.getItems(function(cart){
                $scope.cart = cart.items;
           });
      }

      $scope.removeFromCart = function(productid){
          cartService.removeFromCart(productid);
          cartService.getItems(function(cart){
                $scope.cart = cart.items;
           });
      }

      $scope.subtotal = cartService.getSubtotal;

      $scope.total = cartService.getTotal;
  }]);
