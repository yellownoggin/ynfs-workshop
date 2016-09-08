namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .service('angularfireAuth', angularFireAuthFactory);



    /**
     * angularFireAuthFactory - service for
     *
     * @param  {type} $firebaseAuth description
     * @returns {type}               description
     */
    function angularFireAuthFactory($firebaseAuth) {

        this.Auth = Auth;
        this.googleSignIn = googleSignIn;


        // Service methods

        function Auth() {
            return $firebaseAuth();
        }



    }
}
