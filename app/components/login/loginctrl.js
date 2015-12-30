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

        userService.login($scope.loginData).then(function(data){
            console.log(data);
            $state.reload();

        }).catch(function(err){
                console.log(err);
            });
    };

    $scope.logOut = function(){
        userService.logout();
        $location.path('/');
    };

  }]);
