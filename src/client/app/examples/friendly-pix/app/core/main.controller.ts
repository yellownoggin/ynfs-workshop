namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('MainController', MainController);


        function MainController($state) {

        //     this.$onInit = function () {
        //         this.signOut = signOut;
        //         this.Auth = Auth;
        //         this.state = $state;
        //     };
        //
        // function signOut() {
        //         var that = this;
        //         this.Auth.$signOut();
        //         this.Auth.$onAuthStateChanged(function(firebaseUser) {
        //             if (firebaseUser) {
        //                 console.log("Signed in as:", firebaseUser.uid);
        //
        //             } else {
        //                 console.log("Signed out");
        //                 // fixes profile & splash controller not seeing the change in auth
        //                 $state.reload();
        //             }
        //         });
        //     }

        }
}
