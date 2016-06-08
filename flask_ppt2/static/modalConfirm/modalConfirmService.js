(function() {
  // http://weblogs.asp.net/dwahlin/building-an-angularjs-modal-service
  
  "use strict";
  
  angular
    .module("app.modalConfirm")
    .factory("modalConfirmService", ModalConfirmService);
  
  ModalConfirmService.$inject = ["$uibModal"];
  
  function ModalConfirmService($uibModal) {
    var service = {
      modalDefaults: {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: "/static/modalConfirm/confirm.html"
      },
      modalOptions: {
        actionText: "OK",
        bodyText: "OK to proceed?",
        closeText: "Close",
        headerText: "Confirm"
      },
      show: show,
      showModal: showModal
    };
    
    return service;
    
    function show(customDefaults, customOptions) {
      var currentDefaults = {};
      var currentOptions = {};
      
      jQuery.extend(currentDefaults, service.modalDefaults, customDefaults);
      jQuery.extend(currentOptions, service.modalOptions, customOptions);
      
      if (!currentDefaults.controller) {
        currentDefaults.controller = ["$scope", "$uibModalInstance",
          function($scope, $uibModalInstance) {
            $scope.modalOptions = currentOptions;
            $scope.modalOptions.ok = function(result) {
              $uibModalInstance.close(result);
            };
            $scope.modalOptions.close = function(result) {
              $uibModalInstance.dismiss("cancel");
            };
          }
        ];
      }
      
      return $uibModal.open(currentDefaults).result;
    };

    function showModal(customDefaults, customOptions) {
      if (!customDefaults) customDefaults = {};
      customDefaults.backdrop = "static";
      return service.show(customDefaults, customOptions);
    };
  }
    
}());
