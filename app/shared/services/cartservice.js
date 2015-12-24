app.factory('CartService', ['$http', '$q', '$window', 'ProductService', function($http, $q, $window, productService) {
    // if ($window.localStorage['cart'] == null)
    //     $window.localStorage['cart'] = angular.toJson({});
    var cart = angular.fromJson($window.localStorage['cart']);
    return {
        addToCart: function(productid, quantity) {
            cart = angular.fromJson($window.localStorage['cart']);
            if (cart[productid] == null)
            {
                cart[productid] = {};
                cart[productid].quantity = quantity;
                cart[productid].product = {};
                 productService.getProduct(productid).then(function(data){
                     cart[productid].product = data.product;
                     $window.localStorage['cart'] = angular.toJson(cart);
                 });

            }
            else {
                cart[productid].quantity += quantity;
                $window.localStorage['cart'] = angular.toJson(cart);
            }
            console.log("Add to cart successfully!");
        },

        updateCart: function(productid, quantity) {
            cart = angular.fromJson($window.localStorage['cart']);
            if (cart[productid] != null)
            {
                cart[productid].quantity = quantity;
            }
            console.log("Update cart successfully!");
            $window.localStorage['cart'] = angular.toJson(cart);
        },

        removeFromCart: function(productid) {
            cart = angular.fromJson($window.localStorage['cart']);
            if (cart[productid] != null)
            {
                delete cart[productid];
            }
            console.log("Remove item from cart successfully!");
            $window.localStorage['cart'] = angular.toJson(cart);
        },
        cartItems: cart
    };

}]);
