angular.module('MainCtrl', ['ngRoute'])
.controller('MainController', function($scope,$timeout,$location, coupons,Coupon, vendors, Vendor) {
	$scope.coupons = coupons;
	$scope.vendors = vendors;

	$scope.tagline = 'To the moon and back!';	

	$scope.goToPage = function( page ){
		$location.path(page);
	}
/*
	var Ref = Coupon.flybase();
	
	Ref.on('added', function( data ){
		$timeout(function() {
			$scope.coupons.push( data.value() );
		});
	});
	Ref.on('changed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.coupons ){
				var coupon = $scope.coupons[ i ];
				if( coupon._id == snapshot._id ){
					$scope.coupons[ i ] = snapshot;
				}
			}
		});
	});
	Ref.on('removed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.coupons ){
				var coupon = $scope.coupons[ i ];
				if( coupon._id == snapshot._id ){
					$scope.coupons.splice(i, 1);
				}
			}
		});
	});
*/
}).controller('CouponCtrl', function($scope, $location, coupon) {
	$scope.coupon = coupon;
}).controller('VendorCtrl', function($scope, $location, vendor) {
	$scope.vendor = vendor;
}).config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/home/home.html?v=1.a',
		controller: 'MainController',
		resolve:{
			coupons:function(Coupon){
//				return Coupon.query({"tag":{"$not":"1"}},{"limit":10});
				return Coupon.all();
			}
		}
	}).when('/coupon/:id', {
		templateUrl: 'app/home/coupon.html?a=1',
		controller: 'CouponCtrl',
		resolve:{
			coupon:function(Coupon, $route){
				var p = Coupon.getById($route.current.params.id);
				return p;
			} 
		}
	}).when('/vendor/:id', {
		templateUrl: 'app/home/vendor.html?a=1',
		controller: 'VendorCtrl',
		resolve:{
			vendor:function(Vendor, $route){
				var p = Vendor.getById($route.current.params.id);
				return p;
			} 
		}
	});	
//	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({redirectTo: '/'});
}]);