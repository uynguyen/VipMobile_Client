'use strict';

angularController
  .controller('LoginCtrl', ['$scope','$http','$window','UserService', function($scope, $http, $window, userService) {
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
            $window.localStorage['token'] = data.token;
            $window.localStorage['account'] = data.acc;


        }).catch(function(err){
                console.log(err);
            });
    };


    $scope.login = function() {

      var username = $scope.lguser.username,
          password = $scope.lguser.password;

      if (username !== undefined && password !== undefined) {
        userService.login(username, password).then(function(data) {
      }).catch(function(status) {
          alert('Oops something went wrong!');
        });
      } else {
        alert('Invalid credentials');
      }

    };

  }]);
