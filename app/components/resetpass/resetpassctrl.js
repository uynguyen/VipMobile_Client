/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/31/15
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('vipmobile.controllers')

    .controller('ResetPasswordCtrl', ['$scope', '$http','$stateParams','$location','UserService',
    function($scope, $http,$stateParams,$location, userService) {

        var token = $stateParams.ResetpassToken;
        console.log(token);


        $scope.ResetPassword = function(){
            console.log(JSON.stringify($scope.updatePassData));
            userService.resetPass($scope.updatePassData, token)
            .then(function(res){
                    switch(res.data.mess){
                        case 'Reseted':
                            notie.alert(3, "Khôi phục mật khẩu thành công ! ", 2);
                            break;
                        case 'Expire':
                        case 'Not Exist':
                            notie.alert(3, "Lỗi Unauthorize ! ", 2);
                            break;

                        default:
                            notie.alert(3, "Khôi phục mật khẩu thất bại ", 2);
                            break;
                    }



            }).catch(function (err) {
                    notie.alert(3, "Khôi phục mật khẩu thất bại " + err, 2);
            });
        };

        $scope.SendRequestResetPassword = function(){

            userService.sendRequestResetPass($scope.sentResetPassRequestData.email)
                .then(function(res){
                    notie.alert(3, "Gởi yêu cầu khôi phục thành công. Quý khách vui lòng kiểm tra email để hoàn tất việc khôi phục mật khẩu ! ", 2)

                }).catch(function (err) {
                    notie.alert(3, "Gởi yêu cầu khôi phục mật khẩu thất bại");
                });
        };

    }]);