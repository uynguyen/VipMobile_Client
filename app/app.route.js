'use strict';


app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home'); // Mọi đường dẫn không hợp lệ đều được chuyển đến state home

    //$httpProvider.interceptors.push('TokenInterceptor');

    $stateProvider
        .state('home', {    // Định ngĩa 1 state home
            url:'/home', // khai báo Url hiển thị
            templateUrl:'components/home/homeview.html', // đường dẫn view
            controller:'HomeCtrl',
            title:'Trang chủ',
            access:{
                requiredLogin:false
            }
        })
        .state('product', {    // Định ngĩa 1 state home
            url:'/product', // khai báo Url hiển thị
            templateUrl:'components/product/productsview.html', // đường dẫn view
            controller:'ProductCtrl',
            title:'Danh sách sản phẩm',
            access:{
                requiredLogin:false
            }
        })
        .state('single', {    // Định ngĩa 1 state home
            url:'/single/:id', // khai báo Url hiển thị
            templateUrl:'components/singleproduct/single-product.html', // đường dẫn view
            controller:'SingleCtrl',
            title:'Chi tiết sản phẩm',
            access:{
                requiredLogin:false
            }
        })
        .state('authenticate', {    // Định ngĩa 1 state home
            url:'/authenticate/:RegisterToken', // khai báo Url hiển thị
            templateUrl:'components/authenticate/authenticateview.html', // đường dẫn view
            controller:'AuthenticateCtrl',
            title:'Xác nhận tài khoản',
            access:{
                requiredLogin:false
            }
        });
});
