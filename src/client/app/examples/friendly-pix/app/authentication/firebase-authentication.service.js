var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('angularfireAuth', angularFireAuthFactory);
    function angularFireAuthFactory($firebaseAuth) {
        this.Auth = Auth;
        this.googleSignIn = googleSignIn;
        function Auth() {
            return $firebaseAuth();
        }
    }
})(friendlyPix || (friendlyPix = {}));
