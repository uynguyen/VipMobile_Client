'use strict';


app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home'); // Mọi đường dẫn không hợp lệ đều được chuyển đến state home

    //$httpProvider.interceptors.push('TokenInterceptor');

    $stateProvider
        .state('home', {    // Định ngĩa 1 state home
            url: '/home',  // khai báo Url hiển thị
            templateUrl: 'components/home/homeview.html',  // đường dẫn view
            controller: 'HomeCtrl',
            title: 'Trang chủ',
            access:{
                requiredLogin: false
            }
        })
        .state('product', {    // Định ngĩa 1 state home
            url: '/product',  // khai báo Url hiển thị
            templateUrl: 'components/product/productsview.html',  // đường dẫn view
            controller: 'ProductCtrl',
            title: 'Danh sách sản phẩm',
            access:{
                requiredLogin: false
            }
        });
});
