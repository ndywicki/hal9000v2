angular.module("hal9000").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'client/views/home.html',
      activeTab: 'home'
    }).state('login', {
      url: '/login',
      templateUrl: 'client/views/login.html',
      activeTab: 'login'
    }).state('events', {
      url: '/events',
      templateUrl: 'client/views/events.html',
      activeTab: 'events'
    }).state('charts', {
      url: '/charts',
      templateUrl: 'client/views/charts.html',
      activeTab: 'charts'
    }).state('lights', {
    url: '/lights',
    templateUrl: 'client/views/lights.html',
    activeTab: 'lights'
  });;

  $urlRouterProvider.otherwise("/home");
});