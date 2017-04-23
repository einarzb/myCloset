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

});
