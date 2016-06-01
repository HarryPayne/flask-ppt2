(function() {
  
/**
 *  @name stateLocationRun
 *  @desc Set up event listeners for $stateChangeSucess and 
 *        $locationChangeSuccess. These listeners are intended to ensure that
 *        a state change can change the location without having that trigger
 *        another state change, and vice versa.
 */

  "use strict";
  
  angular
    .module("app.stateLocation")
    .run(stateLocationRun);
  
  stateLocationRun.$inject = ["$rootScope", "$state", "stateLocationService"];

  function stateLocationRun($rootScope, $state, stateLocationService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      $state;
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
      stateLocationService.stateChange();
    });

    $rootScope.$on('$locationChangeSuccess', function() {
      stateLocationService.locationChange();
    });
  }
  
}());
