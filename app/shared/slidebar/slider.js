'use strict';



angularController.controller('NewProductCtrl', ['$scope', 'ProductService', function($scope, productService) {

	productService.getHighProduct(5).then(function(data){
		$scope.slides = data;
		$scope.slides[0].active = true;
	});

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;

}]);
