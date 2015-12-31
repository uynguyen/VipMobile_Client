'use strict';


app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home'); // Mọi đường dẫn không hợp lệ đều được chuyển đến state home


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
        .state('product', {
            url:'/product', // khai báo Url hiển thị
            templateUrl:'components/product/productsview.html', // đường dẫn view
            controller:'ProductCtrl',
            title:'Danh sách sản phẩm',
            access:{
                requiredLogin:false
            }
        })
        .state('single', {
            url:'/single/:id', // khai báo Url hiển thị
            templateUrl:'components/singleproduct/single-product.html', // đường dẫn view
            controller:'SingleCtrl',
            title:'Chi tiết sản phẩm',
            access:{
                requiredLogin:false
            }
        })
        .state('resetpass', {
            url:'/resetpass/:ResetpassToken', // khai báo Url hiển thị
            templateUrl:'components/resetpass/resetpassview.html', // đường dẫn view
            controller:'ResetPasswordCtrl',
            title:'Khôi phục mật khẩu',
            access:{
                requiredLogin:false
            }
        })
        .state('sendResetpassRequest', {
            url:'/sendresetrequest', // khai báo Url hiển thị
            templateUrl:'components/resetpass/requestresetpassview.html', // đường dẫn view
            controller:'ResetPasswordCtrl',
            title:'Gởi yêu cầu khôi phục mật khẩu',
            access:{
                requiredLogin:false
            }
        })
        .state('authenticate', {
            url:'/authenticate/:RegisterToken', // khai báo Url hiển thị
            templateUrl:'components/authenticate/authenticateview.html', // đường dẫn view
            controller:'AuthenticateCtrl',
            title:'Xác nhận tài khoản',
            access:{
                requiredLogin:false
            }
        })
        .state('user', {
            url:'/user', // khai báo Url hiển thị
            templateUrl:'components/user/userview.html', // đường dẫn view
            controller:'UserCtrl',
            title:'Thông tin cá nhân',
            access:{
                requiredLogin: true
            }
        })
        .state('cart', {
            url:'/cart', // khai báo Url hiển thị
            templateUrl:'components/cart/cartview.html', // đường dẫn view
            controller:'CartCtrl',
            title:'Giỏ hàng của bạn',
            access:{
                requiredLogin: false
            }
        })
        .state('checkout', {
            url:'/checkout',
            templateUrl:'components/checkout/checkoutview.html', // đường dẫn view
            controller:'CheckoutCtrl',
            title:'Thanh toán',
            access:{
                requiredLogin: true
            }
        });
});
