'use strict';


  angular.module('vipmobile.controllers')

  .controller('SearchCtrl', ['$scope', '$http','DOMAIN', function($scope, $http, domain) {
      console.log(domain);
    //   $http.get( domain + '/product/search')
    //       .success(function (data, status) {
    //           $scope.products = data;
    //       })
    //       .error(function (err) {
    //           console.log(err);
    //       });

  }]);
