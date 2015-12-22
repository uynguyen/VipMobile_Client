'use strict';

angularController
  .controller('LoginCtrl', ['$scope','$http','$window','DOMAIN', function($scope, $http, $window, domain) {
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

  }]);
