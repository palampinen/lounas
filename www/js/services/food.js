'use strict';

angular.module('lunchr')
// URL to API that enables cross-origin requests to anywhere
.value('corsURL', '//cors-anywhere.herokuapp.com/')
/*
* Lunch menus from lounaat.info
*/
.factory('Food', ['$http','$q','corsURL', function($http, $q,corsURL) {
	return {

		get: function(limit,coords) {
				var day = new Date().getDay();
				if(!day) day = 7; // sunday is 7 in lounaat.info
				var url = corsURL+'http://lounaat.info/ajax/filter?view=lahistolla&page=0';
				var deferred = $q.defer(),
						coords = {};

					$http.get(url,{
						params:{
							day: 1,
						//	'coords[address]':Settings.address,
							'coords[lat]':coords.lat,
							'coords[lng]':coords.lng
						}
					})
					.success(function(data, status , header, config){
					var el = document.createElement( 'div' );
					el.innerHTML = data;
					var sections = el.getElementsByTagName( 'section' );
					//console.log(sections);
					//sections = sections.slice(0,limit)

						deferred.resolve(sections)



					})
					.error(function(data, status){
						deferred.reject(data);
					});
				
				return deferred.promise;
		}
	}
}])


.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
