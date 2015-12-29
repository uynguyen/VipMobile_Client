'use strict';

var backendip = 'localhost:9000/api';

app.factory('BackendService', [function(){
    return {

			product:{
				getAll: function(limit, page){
                    limit = limit || 50;
                    page = page || 1;
					return backendip + '/products' + '?limit=' + limit + '&page=' + page;
				},
				getOne: function(id){
					return backendip + '/product/' +  id;
				},
				search: function(query){
					return backendip + '/search?' + query;
				}
			},



			user:{
				register: function(){
					return backendip + '/user/register';
				},
				login: function(){
					return backendip + '/user/login';
				},
				update: function(id){
					return backendip + '/user/update/' + id;
				}
			},



			category:{
				getAll: function(){
					return backendip + '/category';
				}
			},



			producer:{
				getAll: function(){
					return backendip + '/producer';
				},
			}
    };

}]);
