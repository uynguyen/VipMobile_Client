'use strict';

angularController
    .controller('UserCtrl', ['$scope', 'UserService', function($scope, userService) {
        $scope.user = userService.getCurrentUser();
        $scope.user.birthday = new Date($scope.user.birthday);
        $scope.user.avatar = 'http://placehold.it/150x150';

        $scope.isDisable = true;
        $scope.menus = [{
            id: 0,
            name: "Thông tin cá nhân",
            isDisplay: true
        }, {
            id: 1,
            name: "Cập nhật mật khẩu",
            isDisplay: false
        }, {
            id: 2,
            name: "Lịch sử mua hàng",
            isDisplay: false
        }];

        $scope.Display = function(id) {
            for (var index in $scope.menus) {
                if ($scope.menus[index].id != id)
                    $scope.menus[index].isDisplay = false;
                else {
                    $scope.menus[index].isDisplay = true;
                }
            }

        };
        $scope.EditProfile = function() {


            if ($scope.isDisable)
            {
                $scope.isDisable = false;
                return;
            }
            $scope.user.birthday = Date.parse($scope.user.birthday);
            console.log(new Date());
            userService.updateAccount($scope.user).then(function(res){
                console.log(res.data.mess);
                notie.alert(3, "Cập nhật tài khoản thành công ", 1.5);

            }).catch(function(err){
                    console.log(err);
                    notie.alert(3, "Cập nhật tài khoản thất bại " + err, 2);
                });
        };


        userService.getUserBills(1, 20).then(function(data){
            $scope.totalPage = data.total;
            $scope.listBills = data.result;
            console.log($scope.data);
        });

        $scope.CancelBill = function(id){

        };

    }]);
