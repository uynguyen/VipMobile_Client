appService
.factory('ProductService', ['$http', '$q', 'DOMAIN', function($http, $q, domain) {

    return {

        getCategories: function(){
            var endpoint = domain + '/product/getCategories';
            return $http.get(endpoint)
                .then(
                function(response) {

                    return response.data;
                },
                function(errResponse) {
                    console.error('Error while getting categories');
                    return $q.reject(errResponse);
                }
            );

        },



        getAllProducts: function(limit, page) {
            var endpoint = domain + '/product/list';
            return $http.get(endpoint)
                .then(
                    function(response) {
                        angular.forEach(response.data, function(item) {
                            item.image = domain + item.image;
                        });
                        return response.data;
                    },
                    function(errResponse) {
                        console.error('Error while getting products');
                        return $q.reject(errResponse);
                    }
                );
        },

        getProduct: function(id) {
            var endpoint = domain + '/product/' + id;
            return $http.get(endpoint)
                .then(
                    function(response) {
                        response.data.product.image = domain + response.data.product.image;
                        return response.data;
                    },
                    function(errResponse) {
                        console.error('Error while getting product ' + id);
                        return $q.reject(errResponse);
                    }
                );
        },

        searchProducts: function(filter) {
            var endpoint = domain + '/product/searchProduct';
            return $http.post(endpoint, filter)
                .then(
                    function(response) {
                        angular.forEach(response.data, function(item) {
                            item.image = domain + item.image;
                        });
                        return response.data;
                    },
                    function(errResponse) {
                        console.error('Error while getting product ');
                        return $q.reject(errResponse);
                    }
                );
        },

        getNewProducts: function(limit){
            return $http.get(domain + "/product/getNew/" + limit)
                .then(
                    function(response) {
                        angular.forEach(response.data, function(item) {
                            item.image = domain + item.image;
                        });
                        //return response.data;
                        return [{
                            id: 0,
                            image: 'http://placehold.it/800x300'
                        }, {
                            id: 1,
                            image: 'http://placehold.it/800x300'
                        }, {
                            id: 2,
                            image: 'http://placehold.it/800x300'
                        }, {
                            id: 3,
                            image: 'http://placehold.it/800x300'
                        }];
                    },
                    function(errResponse) {
                        console.error('Error while getting product ');
                        return $q.reject(errResponse);
                    }
                );
        }
    };

}]);
