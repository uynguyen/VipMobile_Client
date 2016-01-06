'use strict';

angularController
    .controller('UserCtrl', ['$scope','$rootScope', 'UserService', function($scope, $rootScope, userService) {
        $scope.isLogwithFB = $rootScope.logWithFacebook;
        $scope.user = userService.getCurrentUser();
        $scope.user.birthday = new Date($scope.user.birthday);
        $scope.user.avatar = 'http://placehold.it/150x150';

        $scope.genders = [
              {'value' : 'Nam', 'id' : true },
              { 'value' : 'Nữ', 'id': false} ] ;

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

        $scope.UpdatePassword = function(){
         //   console.log(JSON.stringify($scope.updatePassData));
            userService.updatePassword($scope.updatePassData).
                then( function(res){
                    console.log("SUCC" + res.data.mess);
                    if(res.data.mess == 'Updated'){
                        notie.alert(3, "Cập nhật mật khẩu thành công", 1.5);

                    }
                    else{
                        notie.alert(3, "Cập nhật mật khẩu thất bại ", 1.5);
                    }
                }).
                catch(function(err){
                    console.log("ERRR");
                }

            );

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
                notie.alert(1, "Cập nhật tài khoản thành công ", 1.5);
                $scope.isDisable = true;
            }, function(err){
                    console.log(err);
                    notie.alert(3, "Cập nhật tài khoản thất bại " + err.data.mess, 2);
                });
        };

        $scope.getMyBills = function(page){
            userService.getUserBills(page, 20).then(function(data){
                $scope.total = data.total * 20;
                $scope.listBills = data.result;
                console.log(data.result);
                console.log(data);
            });

        };

        userService.getUserBills(1, 20).then(function(data){
            $scope.total = data.total * 20;
            $scope.listBills = data.result;
            console.log(data.result);
            console.log(data);
        });

        $scope.CancelBill = function(index){
            console.log(index);
            var id = $scope.listBills[index].id;
            userService.cancelBill(id).then(function(res){
                console.log(res.data.mess);
                $scope.listBills[index].state.id = 5;
                $scope.listBills[index].state.value = 'Đã hủy';
                notie.alert(1, "Hủy hóa đơn thành công", 1.5);

            },function(err){

                    notie.alert(3, "Đã quá thời gian hủy hóa đơn", 1.5);
                    console.log('ERRR');

                });

        };

    }]);
