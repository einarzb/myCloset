var app = angular.module('closetApp', ['ui.router','color.picker']);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider',
          function($stateProvider, $urlRouterProvider, $locationProvider) {
  //'default' state
  $urlRouterProvider.otherwise('home');
  //hashbang fix
  $locationProvider.html5Mode(true);

  $stateProvider

  .state('clueset', {
    url: '/clueset',
    templateUrl: '../templates/partial-myCloest.html'
  })

  .state('home', {
      url: '/home',
      controller:'mainController',
      templateUrl: '/templates/partial-home.html'
  })

  .state('shop', {
      url: '/shop',
      controller:'mainController',
      templateUrl: '/templates/partial-home-shop.html'
  })

  // .state('beer', {
  //     url: '/reviews/:id',
  //     params: {
  //     	beerParam: null
  //     },
  //     controller: 'beerController',
  //     templateUrl: '/templates/beer.html'
  // })
  // .state('register', {
  //     url: '/register',
  //     templateUrl: '/templates/register.html',
  //     controller: 'authController'
  // })
  // .state('login', {
  //     url: '/login',
  //     templateUrl: '/templates/login.html',
  //     controller: 'authController'
  // })

}]);
