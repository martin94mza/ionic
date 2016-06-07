// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('donacion', [
  'ionic',
  'ngResource',
  'LocalStorageModule',
  'angular-jwt',
  ])

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.post['Content-Type'] =  'application/json';
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('grupos', {
      url: "/grupos",
      templateUrl: "templates/grupos.html",
      controller: "GruposController"
    }),

    $stateProvider
      .state('login', {
        cache: false,
        url: "/login",
        templateUrl: "templates/cuentas/login.html",
        controller: "LoginController"
      }),

    $stateProvider
      .state('registro', {
        cache: false,
        url: "/registro",
        templateUrl: "templates/cuentas/registro.html",
        controller: "RegistroController"
      }),

    $stateProvider
      .state('perfil', {
        cache: false,
        url: "/perfil",
        templateUrl: "templates/donantes/perfil.html",
        controller: "ProfileController"
      }),

      $stateProvider
        .state('perfil-edit', {
          cache: false,
          url: "/perfil/edit",
          templateUrl: "templates/donantes/perfil-edit.html",
          controller: "ProfileEditController",
        })
  });