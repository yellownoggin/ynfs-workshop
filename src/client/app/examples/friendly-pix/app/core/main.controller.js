var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('MainController', MainController);
    function MainController(Auth, $state) {
        this.$onInit = function () {
            this.signOut = signOut;
            this.Auth = Auth;
            this.state = $state;
        };
        function signOut() {
            var that = this;
            this.Auth.$signOut();
            this.Auth.$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                }
                else {
                    console.log("Signed out");
                    $state.reload();
                }
            });
        }
    }
})(friendlyPix || (friendlyPix = {}));
