var app = angular.module('closetApp', ['ui.router','color.picker', 'ngMessages']);

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

  .state('about', {
      url: '/about',
      controller:'mainController',
      templateUrl: '/templates/about.html'
  })

  //auth states
  .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html',
    controller: 'authController'
  })

  .state('login', {
  url: '/login',
  templateUrl: '/templates/login.html',
  controller: 'authController'
  })

  .state('logout', {
    url: '/logout',
    templateUrl: '/templates/logout.html',
    controller: 'authController'
  })

});
