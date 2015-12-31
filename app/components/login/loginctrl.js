'use strict';

angularController
  .controller('LoginCtrl', ['$scope','$state','$window','$location','UserService',
  function($scope, $state, $window, $location, userService) {
    $scope.signUp = function(){
        userService.register($scope.user)
            .then(function (data) {
                notie.confirm('Đăng ký tài khoản thành công! Quý khách vui lòng kiểm tra Email '
                 + $scope.user.email + ' để kích hoạt tài khoản.', 'Đồng ý', 'Hủy', function() {
                    $window.open('https://mail.google.com', '_blank');
                });

            })
            .catch(function (err) {
                notie.alert(3, "Đăng ký tài khoản thất bại! " + err.mess, 1.5);
                console.log(err);
            });
    }

    $scope.logIn = function(){

        console.log($scope.loginData);

        userService.login($scope.loginData).then(function(res){
            console.log(res.data.mess);
            switch(res.data.mess){
                case 'Invalid Information':
                    notie.alert(3, "Đăng nhập thất bại, tên đăng nhập hoặc mật khẩu không tồn tại! ", 1.5);
                    break;
                case 'Activated Require':
                    notie.alert(3, "Vui lòng xác nhận tài khoản qua email trước khi đăng nhập ", 1.5);
                    break;
                case 'Success':
                    $state.reload();
                    break;
                default:
                    notie.alert(3, "Đăng nhập thất bại ", 1.5);
                    break;
            }


        }).catch(function(err){
                console.log(err);
            });
    };

    $scope.logOut = function(){
        userService.logout();
        $location.path('/');
    };

  }]);
