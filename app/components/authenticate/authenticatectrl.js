/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/22/15
 * Time: 12:47 AM
 * To change this template use File | Settings | File Templates.
 */
angular.module('vipmobile.controllers')

    .controller('AuthenticateCtrl', ['$scope', '$http','$stateParams','$location','UserService',
    function($scope, $http,$stateParams,$location, userService) {

     var token = $stateParams.RegisterToken;

        var callbackURL = $location.protocol() + "://" + $location.host() + ":" + $location.port()
            + "/#/authenticate/";
        console.log(callbackURL);
        console.log(token);
        userService.activateUser(token)
            .then(
            function(res){
                console.log('RESS' + res.data);
//               var messs = res.data.mess;
//                switch(mess){
//                    case 'NotExist':
//                        $scope.content = "Lỗi! Không tồn tại Token.";
//                        break;
//                    case 'Expire':
//                        $scope.content = "Lỗi! Token đã hết hạn. ";
//                        break;
//                    case 'Was activated':
//                        $scope.content = "Lỗi! Tài khoản đã được kích hoạt. Hãy sử dụng tài khoản của mình để đăng nhập. ";
//                        break;
//                    case 'Error! Email was used':
//                        $scope.content = "Lỗi! Địa chỉ email đã được sử dụng. Vui lòng sử dụng địa chỉ email khác. ";
//                        break;
//                    default:
                        $scope.content = "Kích hoạt tài khoản thành công! Hãy sử dụng tài khoản của mình để đăng nhập";
                        //break;

                }
                ,function (err) {
                    console.log(err);
                    $scope.content = "Có lỗi xảy ra";
            });

}]);
