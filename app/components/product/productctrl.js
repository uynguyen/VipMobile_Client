'use strict';


var products = [
    { id: 0, name: "product 0",
    price: 11500000, shortdescription: "Không mua thì biến!",
    thumbnail: 'http://placehold.it/500x400'
},
    { id: 1, name: "product 1", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 2, name: "product 2", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 3, name: "product 3", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 4, name: "product 4", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 5, name: "product 5", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 6, name: "product 6", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 7, name: "product 7", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 8, name: "product 8", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 9, name: "product 9", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'},
    { id: 10, name: "product 10", price: 11500000, shortdescription: "Không mua thì biến!" ,
    thumbnail: 'http://placehold.it/500x400'}
];


  angular.module('vipmobile.controllers')

  .controller('ProductCtrl', ['$scope', function($scope) {
        $scope.products = products;
  }]);
