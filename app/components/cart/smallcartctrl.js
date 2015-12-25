'use strict';


angularController

  .controller('SmallCartCtrl', ['$scope', '$http', 'CartService', function($scope, $http, cartService) {

      $scope.totalNumber = cartService.getTotalNumber;

  }]);
