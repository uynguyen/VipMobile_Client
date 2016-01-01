'use strict';


angularController
    .controller('ProductCtrl', ['$scope', '$http', 'CartService', 'ProductService',
    function ($scope, $http, cartService, productService) {
    $scope.currentPage = 1;
        $scope.pageSize = 15;
        $scope.products = [];
//      productService.getAllProducts(1, 10).then(function(data){
//          $scope.products = data;
//          console.log($scope.products);
//      }).catch(function(err){
//          console.log(err);
//      });

        $scope.addToCart = cartService.addToCart;

        $scope.getProduct = function (page) {
            console.log(JSON.stringify($scope.filterdata));
            console.log(page);
            $scope.filterdata.page = page;
            console.log($scope.filterdata);
            productService.searchProducts($scope.filterdata).then(function (data) {
                console.log(data);
                $scope.products = data.result;
                $scope.totalitem = data.total;
                var totalPage = Math.floor(data.total / $scope.pageSize);
                if(data.total / $scope.pageSize != 0 ){
                    $scope.totalPage = ++totalPage;
                }
                console.log('xxx' + data.total);
            }).catch(function (err) {
                    console.log(err);
                });
        };
    }]);
