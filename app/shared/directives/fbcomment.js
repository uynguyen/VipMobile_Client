'use strict';

appDirective.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts, colorscheme, datawidth) {
        return '<div class="fb-comments" ' +
                       'data-href="' + href + '" ' +
                       'data-numposts="' + numposts + '" ' +
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
                var pagewidth = attrs.pagewidth || '100%';

                elem.html(createHTML(href, numposts, pagewidth));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});
