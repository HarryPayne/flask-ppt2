(function() {

  "use strict";

  angular
    .module("app.loginInjectorProvider")
    .factory("loginInjector", LoginInjector);

  LoginInjector.$inject = ["$q", "$injector", "$timeout"];

  function LoginInjector($q, $injector, $timeout) {
    var loginService, $http, $state;

    /* Avoid `Uncaught Error: [$injector:cdep] Circular dependency found` */
    /* http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html 
    $timeout(function () { 
      loginService = $injector.get("loginService");
      $http = $injector.get("$http");
      $state = $injector.get("$state");
    }); */

    var service = {
      responseError: responseError
    };

    return service;

    function responseError(rejection) {
      if (rejection.status !== 401) {
        return rejection;
      }

      var deferred = $q.defer();

      loginService()
        .then(
          function () {
            deferred.resolve( $http(rejection.config) );
          },
          function () {
            $state.go("select.home");
            deferred.reject(rejection);
          }
        );

      return deferred.promise;
    };
  }
        
}());