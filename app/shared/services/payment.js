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


    payment.bookProduct = function(bookInfo, cb) {

        var endpoint = domain + '/payment/create';
        $http.post(endpoint, bookInfo)
            .success(function(res) {
                cb(null, res);
            })
            .error(function(err) {
                cb(err);
            });
    };
}]);
