angular.module('app.controllers', [])

.controller('homeCtrl', function($scope,$ionicPopup, $ionicLoading,$http,$rootScope,$state) {
  $scope.d1 = 500;
  $scope.c1 = 500;
  $scope.c2 = 500;
  $scope.c3 = 500;
  $scope.c4 = 500;
  $scope.total =  $scope.c1 +$scope.c2 + $scope.c3 + $scope.c4 ;

  var data;
  console.log("hi");

  $rootScope.noe = "l";

  ////////////////////////////////////
  $scope.showthis1 = function (){
  if($scope.myValue1 === false) {
    $scope.myValue1 = true;
  }else{
    $scope.myValue1 = false;
  }
  }
  $scope.showthis2 = function (){
    if($scope.myValue2 === false) {
      $scope.myValue2 = true;
    }else{
      $scope.myValue2 = false;
    }
  }
  $scope.showthis3 = function (){
    if($scope.myValue3 === false) {
      $scope.myValue3 = true;
    }else{
      $scope.myValue3 = false;
    }
  }
  $scope.showthis4 = function (){
    if($scope.myValue4 === false) {
      $scope.myValue4 = true;
    }else{
      $scope.myValue4 = false;
    }
  }
  ///////////////////////////////////

  $scope.showConfirm = function(i) {


    var confirmPopup = $ionicPopup.confirm({
      title: 'Push UP',
      template: 'Are you sure you want to Transfer  <b>$ ' + i + '</b> to your disposal card?',
      okText:'Push it up!'
    });
    confirmPopup.then(function(res) {
      if(res) {
        load();
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });

    $scope.c1 = $scope.c1 - i;
    $scope.d1 = $scope.d1 + i;

  };

 var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Good News',
      template: 'Transfer Sucess'
    });

    alertPopup.then(function(res) {
      console.log('Transfer Sucess');
    });
  };

  $scope.goToChase= function(){
console.log("Ima here");
   $rootScope.who = "Chase Card";
    $state.go('single');

  }




var load = function(){


    $ionicLoading.show({
      template: 'Loading...'
    });


  //1-pull money
  //2-push money
  //3-
  //
  $http.get('http://mylivesurvey2.azurewebsites.net/display/post?id=' + 2 + '').then(function(successResponse){
    data = successResponse;
    $ionicLoading.hide();
    showAlert();
    console.log(data);


  }, function(errorRepsonse){
    //
    $ionicLoading.hide();
    console.log(errorRepsonse);
  });




}


})

.controller('dashboardCtrl', function($scope ,$rootScope) {
  console.log($rootScope.noe);

})

.controller('loginCtrl', function($scope) {

})

.controller('settingCtrl', function($scope) {

})

.controller('singleCtrl', function($scope,$ionicPopup, $ionicLoading,$http,$rootScope,$state) {


  $scope.who = $rootScope.who;
  $scope.gotohome = function() {

    console.log("hilolonjh");
    load();
    $state.go('home');

  }

  var load = function(){


    $ionicLoading.show({
      template: 'Loading...'
    });

    $http.get('http://localhost:3000/display/post?id=small').then(function(successResponse){
      data = successResponse;
      $ionicLoading.hide();
      showAlert();
      console.log(data);


    }, function(errorRepsonse){
      //
      $ionicLoading.hide();
      console.log(errorRepsonse);
    });




  }

  var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Good News',
      template: 'Transfer Sucess'
    });

    alertPopup.then(function(res) {
      console.log('Transfer Sucess');
    });
  };

})

.controller('aboutCtrl', function($scope) {

})
