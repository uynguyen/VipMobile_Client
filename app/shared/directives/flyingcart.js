'use strict';


appDirective.directive('addToCartButton', function() {

  function link(scope, element, attributes) {
    element.on('click', function(event){
      var cartElem = angular.element(document.getElementsByClassName("shopping-cart"));

      var offsetTopCart = cartElem.prop('offsetTop');
      var offsetLeftCart = cartElem.prop('offsetLeft');
      var widthCart = cartElem.prop('offsetWidth');
      var heightCart = cartElem.prop('offsetHeight');
      console.log('cart: top=' + offsetTopCart + ' left=' + offsetLeftCart + ' w='+widthCart + ' h=' + heightCart);
      var imgElem = angular.element(event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]);
      if (imgElem.prop("currentSrc") == undefined)
        imgElem = angular.element(event.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]);
      var parentElem = angular.element(event.target.parentNode.parentNode.parentNode);
      var offsetLeft = imgElem.prop("offsetLeft");
      var offsetTop = imgElem.prop("offsetTop");
      var imgSrc = imgElem.prop("currentSrc");
      console.log(offsetLeft + ' ' + offsetTop + ' ' + imgSrc);
      var imgClone = angular.element('<img src="' + imgSrc + '"/>');
      imgClone.css({
        'height': '160px',
        'position': 'absolute',
        'top': offsetTop + 'px',
        'left': offsetLeft + 'px',
        'opacity': 0.7
      });
      imgClone.addClass('itemaddedanimate');
      parentElem.append(imgClone);
      setTimeout(function () {
        imgClone.css({
          'height': '75px',
          'top': (offsetTopCart-offsetTop)+'px',
          'left': (offsetLeftCart-offsetLeft)+'px',
          'opacity': 0.5
        });
      }, 500);
      setTimeout(function () {
        imgClone.css({
          'height': 0,
          'opacity': 0.5

        });
        cartElem.addClass('shakeit');
      }, 1000);
      setTimeout(function () {
        cartElem.removeClass('shakeit');
        imgClone.remove();
      }, 1500);
    });
  };


  return {
    restrict: 'E',
    link: link,
		transclude: true,
    replace: true,
    scope: {},
    template: '<button class="add-to-cart" ng-transclude></button>'
  };
});
