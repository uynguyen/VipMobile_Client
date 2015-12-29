app.service('PaymentService', ['$http', 'DOMAIN', function($http, domain) {

    var payment = this;

    payment.createPayment = function(paymentinfo, cb) {

        var endpoint = domain + '/payment/create';
        $http.post(endpoint, paymentinfo)
            .success(function(res) {
                cb(null, res);
            })
            .error(function(err) {
                cb(err);
            });
    };
}]);
