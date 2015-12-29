'use strict';


angularController

  .controller('SmallCartCtrl', ['$scope', '$state', 'CartService', function($scope, $state, cartService) {

      $scope.totalNumber = cartService.getTotalNumber;

      $scope.goToCart = function(){$state.go('cart')};
  }]);
