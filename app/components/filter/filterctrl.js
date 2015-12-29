'use strict';

angularController
    .controller('FilterCtrl', ['$scope' , '$http', 'DOMAIN', 'ProductService',
    function($scope, $http, domain, productService) {

        $scope.filter = {};

//        productService.getCategories().then(function(data){
//            $scope.filter.producers = data.listProducers;
//            $scope.filter.colors = data.listcolors;
//        }).catch(function(err){
//                console.log(err);
//            });

        $scope.filter.price = {
            range: {
                min: 1000000,
                max: 100000000
            },
            minPrice: 5000000,
            maxPrice: 50000000
        };

        $scope.filter.producers = {
            "0": {
                name: "Tất cả",
                checked: true,
                id: 0
            },
            "1": {
                name: "Apple",
                checked: false,
                id: 1
            },
            "2": {
                name: "Samsung",
                checked: false,
                id: 2
            },
            "3": {
                name: "Sony",
                checked: false,
                id: 3
            }
        };

        $scope.filter.sizes = {
            "0": {
                name: "Tất cả",
                checked: true,
                id: 0
            },
            "1": {
                name: "Nhỏ",
                checked: false,
                id: 1
            },
            "2": {
                name: "Vừa",
                checked: false,
                id: 2
            },
            "3": {
                name: "Lớn",
                checked: false,
                id: 3
            }
        };

        $scope.filter.colors = {
            "0": {
                name: "Tất cả",
                checked: true,
                code: 'white',
                id: 0
            },
            "1": {
                name: "Trắng",
                code: 'white',
                checked: false,
                id: 1
            },
            "2": {
                name: "Đen",
                code: 'black',
                checked: false,
                id: 2
            },
            "3": {
                name: "Xanh",
                code: 'green',
                checked: false,
                id: 3
            }
        };



        $scope.$watch('filter', function(){
            $scope.$parent.flag = "Me!";
            var filterdata = {
                searchString: null,
                page: 0,
                limit: 12,
                minPrice: $scope.filter.price.minPrice,
                maxPrice: $scope.filter.price.maxPrice,
                producers: getCheckedFilterList($scope.filter.producers),
                screenSize: getCheckedFilterList($scope.filter.sizes),
                colors: getCheckedFilterList($scope.filter.colors)
            };
            productService.searchProducts(filterdata).then(function(data){
                $scope.$parent.products = data;
                console.log('products updated!');
            }).catch(function(err){
                console.log(err);
            });
        }, true);

    }]);

var getCheckedFilterList = function(list){
        var result = [];
        for (var key in list){
            if (list[key].checked)
                result.push(list[key].name);
            if (list[key].checked && key == "0")
                return null;
        }
        if (result.length == 0)
            return null;

        return result;
};
