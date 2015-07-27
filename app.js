var app = angular.module('thisApp', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl:'./home.html',
  })
  .when('/home',{
    templateUrl:'./home.html',

  })
  .when('/new_meal',{
    templateUrl:'./new_meal.html',
    controller:'meal_info_controller'

  })
  .when('/my_earning',{
    templateUrl:'./my_earning.html',
    controller: 'my_earning_controller'
  })
  .when('/error',{
    template: '<p>Error  Page Not Found</p>'
  })
  .otherwise({
    redirectTo:'/error'
  })
});

app.run(function($rootScope, $location, $timeout) {


        $rootScope.$on('$routeChangeError', function() {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
          $timeout(function() {
            $rootScope.isLoading = false;
          }, 1000);
        });


      // Initialize values
      $rootScope.total_tip =  0;
      $rootScope.meal_count = 0;
      $rootScope.subtotal = 0;
      $rootScope.tip = 0;
      $rootScope.total = 0;
      $rootScope.avg_tip = 0;

      $rootScope.meal_price = '';
      $rootScope.tax_rate = '';
      $rootScope.tip_percentage = '';

});

app.controller('meal_info_controller', function($scope, $rootScope) {

       $scope.submit_new = function(){


          $scope.subtotal = $scope.meal_price*(1+$scope.tax_rate/100.0);
          $scope.tip = $scope.subtotal*$scope.tip_percentage/100.0;
          $scope.total = $scope.subtotal + $scope.tip;

          $scope.total_tip = $rootScope.total_tip;
          $scope.total_tip += $scope.tip;

          $scope.meal_count = $rootScope.meal_count;
          $scope.meal_count +=1

          if($scope.meal_count){
              $scope.avg_tip = $scope.total_tip/$scope.meal_count;

          }

          $rootScope.total_tip = $scope.total_tip;
          $rootScope.meal_count = $scope.meal_count;
          $rootScope.avg_tip = $scope.avg_tip;


          console.log($rootScope.avg_tip);
        }; 


        $scope.cancel = function(){
            $scope.meal_price = '';
            $scope.tax_rate = '';
            $scope.tip_percentage = '';
        };




});

app.controller('my_earning_controller',function($scope, $rootScope){

      $scope.reset = function(){

          $scope.total_tip =  0;
          $scope.meal_count = 0;
          $scope.avg_tip = 0;

      };

});