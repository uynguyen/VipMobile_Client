'use strict';

  angularController
  .controller('HomeCtrl', ['$scope', '$stateParams','$rootScope', 'UserService', function($scope, $stateParams,$rootScope, UserService) {

      var id = $stateParams.id;
      var token = $stateParams.token;
      var loginData = {
          username : id,
          password: token
      };
      if(id && token && $rootScope.logWithFacebook == false){
          UserService.login(loginData).then(function (res) {

                  console.log("Auto login success");
                  $rootScope.logWithFacebook = true;
                  console.log(res.data.mess);



          }, function (err) {
              console.log("Auto login err");
              console.log(err);
          });
      }


  }]);
