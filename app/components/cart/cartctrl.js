'use strict';


angularController

  .controller('CartCtrl', ['$scope', '$state', 'CartService', function($scope, $state, cartService) {
     cartService.getItems(function(cart){
           $scope.cart = cart.items;
      });
      $scope.checkout = function(){
          $state.go('checkout');
      };

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
