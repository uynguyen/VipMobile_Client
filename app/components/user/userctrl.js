'use strict';

angularController
    .controller('UserCtrl', ['$scope', 'UserService', function($scope, userService) {
        $scope.user = userService.getCurrentUser();

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
        //    console.log("Edit profile!");
            if ($scope.isDisable)
                $scope.isDisable = false;
        };


        userService.getUserBills(1, 20).then(function(data){
            $scope.totalPage = data.total;
            $scope.listBills = data.result;
            console.log($scope.data);
        });

        $scope.CancelBill = function(id){

        };

    }]);
