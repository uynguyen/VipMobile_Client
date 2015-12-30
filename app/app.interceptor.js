/**
 * Created with JetBrains WebStorm.
 * User: LeeSan
 * Date: 12/29/15
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */
appInterceptor.factory('sessionInjector',['$window','$location', '$q', 'AuthenticationService',
function($window, $location, $q, AuthenticationService) {
    var sessionInjector = {
        request: function(config)
        {
            var token = $window.localStorage['token'];
            if(token) // If token exist
            {
                config.headers.Authorization = 'Bearer '+ token;
            //    console.log('Bearer '+ token);
            }

            return config || $q.when(config)
        }
        ,
        response: function(res)
        {
            //console.log(res);
            return res || $q.when(res);
        },

        responseError: function(res){
            //console.log(res.data);
            if (res.data.mess)
            {
                AuthenticationService.logout();
                $location.path('/');
            }

            return res || $q.when(res);
        }
    };
    return sessionInjector;
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);
