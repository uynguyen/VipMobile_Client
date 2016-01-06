'use strict';

appDirective.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts, datawidth, orderby) {
        return '<div class="fb-comments" ' +
                       'data-href="' + href + '" ' +
                       'data-numposts="' + numposts + '" ' +
                        'data-order-by="' + orderby + '" ' +
                       'data-width="' + datawidth + '">' +
               '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href        = newValue;
                var numposts    = attrs.numposts    || 5;
                var orderby    = attrs.orderby    || 'reverse_time';
                var pagewidth = attrs.pagewidth || '100%';

                elem.html(createHTML(href, numposts, pagewidth, orderby));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});
