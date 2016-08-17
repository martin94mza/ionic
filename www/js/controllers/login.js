angular.module('donacion')
  .controller('LoginController', function ($scope, AuthService, $uibModalInstance) {

    $scope.credentials = {};

    $scope.login = function() {
      AuthService.login($scope.credentials);
      $uibModalInstance.close();
    };

    $scope.close = function () {
      $uibModalInstance.dismiss('cerrar');
    };
  });
