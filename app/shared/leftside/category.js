'use strict';


var SampleData = [
	{ id: 1, name: 'IPhone'},
	{ id: 2, name: 'Samsung Galaxy' },
	{ id: 3, name: 'BPhone' },
	{ id: 4, name: 'Zendfone' },
	{ id: 5, name: 'Lumina' },
	{ id: 6, name: 'OPPO' }
];

app.controller('CategoryCtrl', function ($scope) {

		SampleData[0].isactive = true;
	  	$scope.categories = SampleData;

		$scope.active = function(id){
			$scope.categories.forEach(function(cat){
				cat.isactive = false;
				if (cat.id == id) cat.isactive = true;
			});

		};
});
