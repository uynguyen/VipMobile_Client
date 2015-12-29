'use strict';

angularController
  .controller('LoginCtrl', ['$scope','$http','$window', 'UserService','DOMAIN', function($scope, $http, $window, userService, domain) {
    $scope.signUp = function(){

        $http.post( domain + '/user/register', $scope.user)
            .success(function (data, status) {
                notie.confirm('Đăng ký tài khoản thành công! Quý khách vui lòng kiểm tra Email ' + $scope.user.email + ' để kích hoạt tài khoản.', 'Yes', 'Cancel', function() {
                    $window.open('https://mail.google.com', '_blank');
                });

            })
            .error(function (err) {
                notie.alert(3, "Đăng ký tài khoản thất bại! " + err.mess, 1.5);
                console.log(err);
            });
    }

    $scope.logIn = function(){

        console.log($scope.loginData);

        userService.login($scope.loginData).then(function(data){
            console.log(data);
            $window.localStorage['token'] = data.token;
            $window.localStorage['account'] = data.acc;


        }).catch(function(err){
                console.log(err);
            });
    }

  }]);
