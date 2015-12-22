'use strict';


angularController
    .controller('FilterCtrl', ['$scope', '$http', 'DOMAIN', function($scope, $http, domain) {
        $scope.filterprice = {
            range: {
                min: 1000000,
                max: 20000000
            },
            minPrice: 5000000,
            maxPrice: 10000000
        };
        console.log(domain);
        //   $http.get( domain + '/product/search')
        //       .success(function (data, status) {
        //           $scope.products = data;
        //       })
        //       .error(function (err) {
        //           console.log(err);
        //       });

        $scope.producers = {
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

        $scope.sizes = {
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

        $scope.colors = {
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
    }]);
