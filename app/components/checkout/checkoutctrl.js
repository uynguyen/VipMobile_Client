'use strict';

angularController
    .controller('CheckoutCtrl', ['$scope', 'PaymentService', 'CartService',
        function($scope, paymentService, cartService) {

            cartService.getItems(function(cart){
                $scope.cart = cart.items;
            });


            cartService.getTransportFree(function(fee){
                $scope.transportFee = fee;
            });


            cartService.getVAT().then(
                function(res){

                        $scope.VAT = res;

                },
                function(err){
                    console.log(err);
                }
            );



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
                cart: $scope.cart,
                transactions: [{
                    amount: {
                        total: cartService.getTotal().toString(),
                        currency: "USD",
                        details: {
                            subtotal: cartService.getSubtotal().toString(),
                            tax: cartService.getTax().toString(),
                            shipping: cartService.getShippaid().toString()
                        }
                    },
                    description: "Đơn hàng thanh toán thông qua paypal của VipMobileShop"
                }]
            };
            $scope.getTax = cartService.getTax;
            $scope.getTotal = cartService.getTotal;

            $scope.PlaceOrder = function() {
                console.log($scope.paymentinfo);
                paymentService.createPayment($scope.paymentinfo, function(err, res){
                    if (err){
                        console.log(err);
                        return;
                    }
                    $scope.isSuccess = true;
                    console.log(res);

                });
            };

            $scope.bookProduct = function(){
                var bookInfo = {
                    info : $scope.transportInfo,
                    cart :  $scope.cart,
                    VAT: $scope.VAT
                };
                console.log(JSON.stringify(bookInfo));
                cartService.bookProduct(bookInfo).then(
                   function(res){
                       if(res.data.mess && res.data.mess == 'Success'){
                           notie.alert(1, "Đặt hàng thành công. Quý khách vui lòng đến hộp mail để kiểm tra giao dịch.", 1.5);
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
