(function() {
  
  "use strict";
  
  angular
    .module("app.login")
    .service("loginService", loginService);
  
  loginService.$inject = ["$uibModal", "$rootScope", "store", "jwtHelper"];
  
  function loginService($uibModal, $rootScope, store, jwtHelper) {

    return getUserViaModal;
    
    function getUserViaModal() {
      var instance = $uibModal.open({
        templateUrl: "static/login/login.html",
        controller: "Login",
        controllerAs: "login"
      });

      return instance.result.then(assignCurrentUser);
    };

    function assignCurrentUser(response) {
      if (response.status == 200) {
        store.set("jwt", response.data.access_token);
        var user = jwtHelper.decodeToken(response.data.access_token).identity;
        $rootScope.currentUser = user;
        return user;
      }
      return response;
    };
  };
  
}());