app.service('CartService', ['$http', '$q', '$window', 'ProductService', function($http, $q, $window, productService) {
    var cartService = this;

    cartService.shippaid = 0.02;
    cartService.tax = 0.07;

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
        return Number((subtotal / 21000).toFixed(2));
    };

    cartService.getTotal = function() {
        return Number((cartService.getSubtotal() + cartService.getShippaid() + cartService.getTax()).toFixed(2));
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
        return Number((cartService.getSubtotal() * cartService.tax / 21000).toFixed(2));
    };

    cartService.getShippaid = function() {
        return Number((cartService.getSubtotal() * cartService.shippaid / 21000).toFixed(2));
    };

}]);
