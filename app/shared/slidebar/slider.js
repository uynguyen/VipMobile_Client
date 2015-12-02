'use strict';

var app = angular.module('vipmobile');

var SlideData = [
	{ id: 0, src: 'http://placehold.it/800x300' },
	{ id: 1, src: 'http://placehold.it/800x300' },
	{ id: 2, src: 'http://placehold.it/800x300' },
	{ id: 3, src: 'http://placehold.it/800x300' }

];

app.controller('SliderCtrl', ['$scope', function ($scope) {
	SlideData[0].isactive = true;
	  	$scope.slides = SlideData;
		
	
}]);
