'use strict';

angularController
    .controller('LoginCtrl', ['$scope', '$state', '$window', '$location', 'UserService','$http',
    function ($scope, $state, $window, $location, userService, $http) {
        $scope.signUp = function () {
            userService.register($scope.user)
                .then(function (res) {

                    var mess = res.data.mess;
                    if (mess == 'EmailExisted')
                        notie.alert(2, "Đăng ký tài khoản thất bại! Email đã tồn tại", 1.5);

                    if (mess == 'UserNameExisted')
                        notie.alert(2, "Đăng ký tài khoản thất bại! Tên đăng nhập đã tồn tại", 1.5);
                    if (mess == 'CreateSuccess')
                        notie.confirm('Đăng ký tài khoản thành công! Quý khách vui lòng kiểm tra Email '
                            + $scope.user.email + ' để kích hoạt tài khoản.', 'Đồng ý', 'Hủy', function () {
                            var emailtype = $scope.user.email;
                            if(emailtype.indexOf("gmail") > -1)
                                $window.open('https://mail.google.com', '_blank');
                            else
                            {
                                if(emailtype.indexOf("yahoo") > -1){
                                    $window.open('https://login.yahoo.com', '_blank');
                                }
                                else{
                                    if(emailtype.indexOf("student") > -1)
                                    {
                                        $window.open('https://login.microsoftonline.com', '_blank');
                                    }
                                    else{
                                        $window.open('https://google.com', '_blank');
                                    }
                                }
                            }

                        });
                    if(mess == 'Error')
                        notie.alert(3, "Đăng ký tài khoản thất bại! Vui lòng kiểm tra lại thông tin", 1.5);
                }, function (err) {
                    notie.alert(3, "Đăng ký tài khoản thất bại! " + err.mess, 1.5);
                    console.log(err);
                });
        }

        $scope.logIn = function () {

            console.log($scope.loginData);

            userService.login($scope.loginData).then(function (res) {
                console.log(res.data.mess);
                switch (res.data.mess) {
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


            }, function (err) {
                    console.log(err);
                });
        };

        $scope.logOut = function () {
            userService.logout();
            $location.path('/');
        };


        $scope.logInWithFacebook = function(){
            console.log("fb");
//            userService.loginWithFacebook().then(
//              function(res){
//
//              }  ,
//              function(err){
//
//              }
//            );

            $http.get('/users/auth/facebook',
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authentication, Authorization, X-Requested-With',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                    }
                }

            ).success(
                function(res){
                    console.log(res);
                    console.log('Log in with facebook successful');
                    return res;
                }).error(function(err){
//                        console.log('Cancel bill error');
                    console.log("fb err");
                    console.log(err);

                });
        };

    }]);
