

var app = angular.module('vipmobile');

app.factory('ProductService', ['$http', '$q', 'BackEndService', function($http, $q, backend){
 
    return {  
			
            getAllProducts: function(limit, page) {
                    return $http.get(backend.product.getAll(limit, page))
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while getting products');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            getProduct: function(id){
                    return $http.get(backend.product.getOne(id))
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while getting product ' + id);
                                        return $q.reject(errResponse);
                                    }
                            );
            },
			
			searchProducts: function(query){
				return $http.get(backend.product.search(query))
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while getting product ' + query);
                                        return $q.reject(errResponse);
                                    }
                            );
			}			      
    };
 
}]);