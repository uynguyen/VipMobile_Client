'use strict';

angularController
    .controller('CheckoutCtrl', ['$scope', 'PaymentService', 'CartService',
        function($scope, paymentService, cartService) {

            $scope.getTax = cartService.getTax;
            $scope.getTotal = cartService.getTotal;
            $scope.getShip = cartService.getShippaid;

            cartService.getItems(function(cart){
                $scope.cart = cart.items;
            });


            cartService.getTransportFree(function(fee){
                console.log(fee);
                $scope.transportFee = fee;

            });


            $scope.$watch('transportInfo', function(){
                cartService.ship = $scope.transportInfo.fee.fee || 0;
            }, true);




            $scope.credit_card = {
                number: "4032038374061251"
            };

            $scope.paymentinfo = {
                intent: "sale",

                payer: {
                    payment_method: "credit_card",
                    funding_instruments: [{
                        credit_card: $scope.credit_card
                    }]
                },
                transactions: [{
                    amount: {
                        total: cartService.getTotal(),
                        currency: "USD",
                        details: {
                            subtotal: cartService.getSubtotal(),
                            tax: $scope.getTax(),
                            shipping: cartService.getShippaid()
                        }
                    },
                    description: "Đơn hàng thanh toán thông qua paypal của VipMobileShop"
                }]
            };





            $scope.PlaceOrder = function() {
                $scope.placeOrderDisabled = true;
                console.log(JSON.stringify($scope.paymentinfo));

                $scope.paymentinfo = {
                    intent: "sale",

                    payer: {
                        payment_method: "credit_card",
                        funding_instruments: [{
                            credit_card: $scope.credit_card
                        }]
                    },
                    transactions: [{
                        amount: {
                            total: cartService.getTotal(),
                            currency: "USD",
                            details: {
                                subtotal: cartService.getSubtotal(),
                                tax: $scope.getTax(),
                                shipping: cartService.getShippaid()
                            }
                        },
                        description: "Đơn hàng thanh toán thông qua paypal của VipMobileShop"
                    }]
                };

                var bookInfo = {
                    info : $scope.transportInfo,
                    cart :  $scope.cart,
                    VAT: $scope.getTax(),
                    paymentinfo: $scope.paymentinfo
                };
                paymentService.createPayment(bookInfo, function(err, res){
                    if (err){
                        console.log(err);
                        notie.alert(3, "Thanh toán không thành công! Vui lòng thử lại.", 1.5);
                    }
                    else {
                    notie.alert(1, "Thanh toán thành công! Vui lòng kiểm tra lại đơn hàng.", 1.5);
                    cartService.clearCartItems();
                    console.log(res);

                }
                $scope.placeOrderDisabled = false;

                });
            };

            $scope.bookProduct = function(){
                var bookInfo = {
                    info : $scope.transportInfo,
                    cart :  $scope.cart,
                    VAT: $scope.getTax()
                };
                console.log(JSON.stringify(bookInfo));
                cartService.bookProduct(bookInfo).then(
                   function(res){
                       if(res.data.mess && res.data.mess == 'Success'){
                           notie.alert(1, "Đặt hàng thành công. Quý khách vui lòng đến hộp mail để kiểm tra giao dịch.", 1.5);
                           cartService.clearCartItems();

                           cartService.getItems(function(cart){
                               $scope.cart = cart.items;
                           });
                       }
                   },
                   function(err){
                       console.log(err);
                       notie.alert(1, "Có lỗi xảy ra! Vui lòng thử lại", 1.5);
                   });

            };


            $scope.isValidForm = function(){
                //console.log($scope.transportInfo.fee);
                return  $scope.transportInfo != null
                && $scope.transportInfo.first_name && $scope.transportInfo.first_name.length != 0
                    && $scope.transportInfo.last_name && $scope.transportInfo.last_name.length != 0
                    && $scope.transportInfo.address && $scope.transportInfo.address.length != 0
                    && $scope.transportInfo.phone && $scope.transportInfo.phone.length != 0
                    && $scope.transportInfo.fee;
            };

        }
    ]);
