appService.service('CartService', ['$http', '$q', '$window', 'ProductService', 'DOMAIN',
function($http, $q, $window, productService, domain) {
    var cartService = this;





    cartService.shippaid = 0;
    cartService.tax = 0.1;

    cartService.getItems = function(cb) {
        cartService.getCartItems(function(cart) {
            cb(cart);
        });
    };

    cartService.addToCart = function(productid, quantity) {
        productService.getProduct(productid).then(function(data) {
            cartService.getCartItems(function(cart) {
                if (cart.items[productid] == null) // add new
                {
                    cart.size += quantity;
                    cart.items[productid] = {};
                    cart.items[productid].quantity = quantity;

                    cart.items[productid].product = data.product;


                } else // increase quantity
                {
                    cart.items[productid].quantity += quantity;
                    cart.size += quantity;
                }
                console.log("Add to cart successfully!");
            });
        });
    };

    cartService.updateCart = function(productid, quantity) {
        cartService.getCartItems(function(cart) {
            if (cart.items[productid] != null) {
                cart.size += (quantity - cart.items[productid].quantity);
                if (cart.size < 0) cart.size = 0;
                cart.items[productid].quantity = quantity;
                console.log("Update item successfully!");
            } else {
                console.log("Item does not exist!");
            }
        });
    };

    cartService.getTotalNumber = function() {
        var number = 0;
        cartService.getCartItems(function(cart) {
            number = cart.size;
        });
        return number;
    };

    cartService.getSubtotal = function() {
        var subtotal = 0;
        cartService.getCartItems(function(cart) {
            for (var key in cart.items) {
                subtotal += (cart.items[key].quantity * cart.items[key].product.price);
            }
        });
        return subtotal;
    };

    cartService.getTotal = function() {
        return cartService.getSubtotal() + cartService.getShippaid() + cartService.getTax();
    };

    cartService.removeFromCart = function(productid) {
        cartService.getCartItems(function(cart) {
            if (cart.items[productid] != null) {
                cart.size -= cart.items[productid].quantity;
                if (cart.size < 0) cart.size = 0;
                delete cart.items[productid];
                console.log("Remove item from cart successfully!");
            } else {
                console.log("Item does not exist!");
            }
        });

    };

    cartService.getCartItems = function(cb) {
        if (angular.fromJson($window.localStorage['cart']) == null)
            $window.localStorage['cart'] = angular.toJson({
                size: 0,
                items: {}
            });

        var cart = angular.fromJson($window.localStorage['cart']);
        cb(cart);
        $window.localStorage['cart'] = angular.toJson(cart);
    };

    cartService.getTax = function() {
        return cartService.getSubtotal() * cartService.tax;
    };

    cartService.getShippaid = function() {
        return cartService.getSubtotal() * cartService.shippaid;
    };


    cartService.getTransportFree = function(cb){
        var endpoint = domain + '/bill/getTransportFee';
        console.log(endpoint);
        $http.get(endpoint)
            .then(function(response) {
                console.error(response);
                cb(response.data);

            },
            function(errResponse) {
                console.error('Error while getting fee');

            }
        );

    };

    cartService.getVAT = function(){
        var endpoint = domain + '/bill/getVAT';
        console.log(endpoint);
        return $http.get(endpoint)
            .then(
            function(res) {
               return res.data;
            },
            function(err) {
                console.error('Error while getting VAT');
                $q.reject(err);

            }
        );
    };

    cartService.bookProduct = function(bookInfo){
        var endpoint = domain + '/bill/addNewUserBill';
        console.log(endpoint);
        return $http.post(endpoint, bookInfo)
            .then(
            function(res) {
                return res;
            },
            function(err) {
                console.error('Error while getting add user bill');
                $q.reject(err);

            }
        );
    }
}]);
