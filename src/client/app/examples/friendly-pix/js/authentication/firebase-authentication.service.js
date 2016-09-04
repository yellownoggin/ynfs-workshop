var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('Auth', firebaseAuthorizationService);
    function firebaseAuthorizationService($firebaseAuth) {
        return $firebaseAuth();
    }
})(friendlyPix || (friendlyPix = {}));
