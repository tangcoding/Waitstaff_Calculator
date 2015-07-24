angular.module('myApp', []).controller('calculator_controller', function($scope) {

  $scope.init = function(){
      $scope.total_tip =  0;
      $scope.meal_count = 0;
      $scope.subtotal = 0;
      $scope.tip = 0;
      $scope.total = 0;
      $scope.avg_tip = 0;

      $scope.meal_price = '';
      $scope.tax_rate = '';
      $scope.tip_percentage = '';
      $scope.show_error=false;

  };


  $scope.submit_new = function(){

    if(input_form.$valid){
          $scope.subtotal = $scope.meal_price*(1+$scope.tax_rate/100.0);
          $scope.tip = $scope.subtotal*$scope.tip_percentage/100.0;
          $scope.total = $scope.subtotal + $scope.tip;

          $scope.total_tip += $scope.tip;
          $scope.meal_count +=1

          if($scope.meal_count){
              $scope.avg_tip=$scope.total_tip/$scope.meal_count;

          }

    }


  };

  $scope.cancel = function(){
    $scope.meal_price = '';
    $scope.tax_rate = '';
    $scope.tip_percentage = '';

  };

  $scope.reset = function(){
    $scope.init();

  };

});