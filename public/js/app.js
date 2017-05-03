var app = angular.module('closetApp', ['ui.router','color.picker']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('home');
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
      url: '/home',
      controller:'mainController',
      templateUrl: '/templates/partial-home.html'
  })

  .state('closet', {
      url: '/closet',
      controller:'mainController',
      templateUrl: '/templates/closet.html'
    })

  .state('shop', {
      url: '/shop',
      controller:'mainController',
      templateUrl: '/templates/shop.html'
  })
  .state('look', {
      url: '/look',
      controller:'mainController',
      templateUrl: '/templates/look.html'
  })
  .state('signup', {
      url: '/signup',
      controller:'authController',
      templateUrl: '/templates/signup.html'
  })
  .state('login', {
      url: '/login',
      controller:'authController',
      templateUrl: '/templates/login.html'
  })

});
