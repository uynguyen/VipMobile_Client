'use strict';


  angular.module('vipmobile.controllers')

  .controller('ProductCtrl', ['$scope', '$http', 'DOMAIN', function($scope, $http,domain) {
      console.log(domain);


       $http.get( domain + '/product/list')
           .success(function (data, status) {
               console.log(data);
               angular.forEach(data, function(item){
                   item.image = domain + item.image;
                   console.log(item);
               });



               $scope.products = data;
           })
           .error(function (err) {
               console.log(err);
           });


  }]);
