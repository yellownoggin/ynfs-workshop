var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .run(['$rootScope', '$state', authRequired]);
    function authRequired($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('home');
            }
        });
    }
})(friendlyPix || (friendlyPix = {}));
