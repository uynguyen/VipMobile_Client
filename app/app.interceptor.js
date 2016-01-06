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
        //    config.headers['Content-Type'] = 'application/json';
            if(token) // If token exist
            {
                config.headers.Authorization = 'Bearer '+ token;
            //    console.log('Bearer '+ token);
            }

            return config;
        },
        response: function(res){
            //console.log(res);
                return res || $q.when(res);
        },

        responseError: function(res){

            if (res.data && res.data.mess && (res.data.mess == 'TokenExpire' || res.data.mess=='Unauthorized'))
            {
                AuthenticationService.logout();
                $location.path('/');
            }

            return $q.reject(res);
        }
    };
    return sessionInjector;
}]);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
//    $httpProvider.defaults.useXDomain = true;
     //  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
