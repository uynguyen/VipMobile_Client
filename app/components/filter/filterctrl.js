'use strict';

angularController
    .controller('FilterCtrl', ['$scope' , '$http', 'DOMAIN', 'ProductService',
    function($scope, $http, domain, productService) {

        $scope.filter = {};

       productService.getCategories().then(function(data){
           console.log(data);
           $scope.filter.producers = data.listProducers;
           $scope.filter.colors = data.listcolors;
       }).catch(function(err){
               console.log(err);
           });

        $scope.filter.price = {
            range: {
                min: 1000000,
                max: 100000000
            },
            minPrice: 5000000,
            maxPrice: 50000000
        };

        // $scope.filter.sizes = {
        //     "0": {
        //         name: "Tất cả",
        //         checked: true,
        //         id: 0
        //     },
        //     "1": {
        //         name: "Nhỏ",
        //         checked: false,
        //         id: 1
        //     },
        //     "2": {
        //         name: "Vừa",
        //         checked: false,
        //         id: 2
        //     },
        //     "3": {
        //         name: "Lớn",
        //         checked: false,
        //         id: 3
        //     }
        // };

        // };



        $scope.$watch('filter', function(){
            var filterdata = {
                searchString: $scope.filter.searchString,
                page: $scope.$parent.currentPage,
                limit: $scope.$parent.pageSize,
                minPrice: $scope.filter.price.minPrice,
                maxPrice: $scope.filter.price.maxPrice,
                producers: getCheckedFilterList($scope.filter.producers),
                screenSize: getCheckedFilterList($scope.filter.sizes),
                colors: getCheckedFilterList($scope.filter.colors)
            };
            console.log(angular.toJson(filterdata));
            productService.searchProducts(filterdata).then(function(data){
                $scope.$parent.products = data.result;
                $scope.$parent.totalitem = data.total;
                var totalPage = Math.floor(data.total / $scope.$parent.pageSize);
                if(data.total / $scope.$parent.pageSize != 0 ){
                    $scope.$parent.totalPage = ++totalPage;
                }
                $scope.$parent.filterdata = filterdata;
                console.log('products updated!'+ data.totalitem);
            }).catch(function(err){
                console.log(err);
            });
        }, true);

    }]);

var getCheckedFilterList = function(list){
        var result = [];
        for (var key in list){
            if (list[key].checked)
                result.push(list[key].value);

        }
        if (result.length == 0)
            return null;

        return result;
};
