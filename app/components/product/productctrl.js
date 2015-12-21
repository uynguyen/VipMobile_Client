'use strict';


  angular.module('vipmobile.controllers')

  .controller('ProductCtrl', ['$scope', '$http','DOMAIN', function($scope, $http, domain) {
      console.log(domain);
      $http.get( domain + '/product/list')
          .success(function (data, status) {
              $scope.products = data;
          })
          .error(function (err) {
              console.log(err);
          });

  }]);
