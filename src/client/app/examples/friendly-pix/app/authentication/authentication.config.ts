namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .run(['$rootScope', '$state', authRequired]);

    /**
     * authRequired
     * Redirects unauthorized users to splash page pages that require auth.
     * Used with routed resolved property and the router helper method:
     * $firebaseAuth.$requireSignIn();
     * TODO: e.g. Right now app require sign in for home feed & profile.
     * friendlyPix demo does not really have that limitation
     */
    function authRequired($rootScope, $state: angular.ui.IStateService) {

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page

            if (error === 'AUTH_REQUIRED') {
                $state.go('home');
            }
        });
    }
}
