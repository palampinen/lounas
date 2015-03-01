'use strict';
/**
* @ngdoc function
* @name lunchr.controller:FoodCtrl
* @description
* # FoodCtrl
* Get food data
*/
angular.module('lunchr')

.controller('FoodCtrl', function ($scope, $cordovaGeolocation, $ionicPlatform, Food,TDCardDelegate) {
	
	$scope.food = 'Loading food...';
	var foodsArray = [],
			id = 0;


	var posOptions = {timeout: 10000, enableHighAccuracy: false};
	$ionicPlatform.ready(function() {
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {

      Food.get(100,{lat:position.coords.latitude, lng:position.coords.longitude })
			.then(function(data) {

				console.log(data);
				_.each(data, function(restaurantHTML) {
					foodsArray.push( (restaurantHTML.outerHTML))
					//foodsArray.push( $sce.trustAsHtml(restaurantHTML.outerHTML))
				})

				foodsArray.reverse();

			  $scope.cards = Array.prototype.slice.call(foodsArray, 0);

			  $scope.cardDestroyed = function(index) {
			    $scope.cards.splice(index, 1);
			  };

			  $scope.addCard = function() {
			  
			   /* var newCard = foodsArray[Math.floor(Math.random() * foodsArray.length)];
			    newCard.id = Math.random();
			    $scope.cards.push(angular.extend({}, newCard));*/
			  }

				
			}, function(data) {
				console.log('No food data for you')
			});



    }, function(err) {
      // error
    });
   });

	


})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
});
