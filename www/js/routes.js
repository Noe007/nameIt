angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('home', {
    url: '/page1',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'dashboardCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('setting', {
    url: '/settings',
    templateUrl: 'templates/setting.html',
    controller: 'settingCtrl'
  })

  .state('single', {
    url: '/single',
    templateUrl: 'templates/single.html',
    controller: 'singleCtrl'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })

$urlRouterProvider.otherwise('/login')



});
