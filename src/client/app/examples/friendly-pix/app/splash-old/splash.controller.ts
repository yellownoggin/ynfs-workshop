namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('SplashController', SplashController);

    function SplashController(currentAuth, Auth, $state, firebaseFpService) {

        // Splash controller is similar to the home controller in example
        // https://github.com/firebase/angularfire/blob/master/docs/guide/user-auth.md#ui-router-example
        this.title = 'Splash Controller';
        this.isUser = false;

        this.$onInit = function() {
            this.currentAuth = currentAuth;
            this.Auth = Auth;
            this.state = $state;
            this.getCurrentAuth = getCurrentAuth;
            this.showLogin = showLogin;
            this.firebaseFpService = firebaseFpService

            this.getCurrentAuth()
            this.showLogin(this.currentAuth);
            this.signInWithGoogle = signInWithGoogle;
        }


        ////////////////////Controller methods



        // TODO: the if statement prevents the following error
        // angular.js:13920 TypeError: Cannot read property 'uid' of null
        // when the the binding in splash template calls for sc.uid
        /**
         * getCurrentAuth
         * 1. Sets uid binding for user profile state(url) parameters
         * 2. Uses showLogin to display login or not
         */
        function getCurrentAuth() {
            if (this.currentAuth) {
                //Needed for user profile state(url) parameters
                this.uid = this.currentAuth.uid;
            } else {
                this.uid = '';
            }
        }

        /**
         * showLogin -  sets is userId to show or hide login buttons
         *  May need re-factoring to be combined with getCurrentAuth
         */
        function showLogin(userId) {
            if (userId) {
                this.isUser = true;
                console.log(this.isUser, 'show login has been called true');
            } else {
                this.isUser = false;
                console.log(this.isUser, 'show login has been called false');
            }
        }

        /**
         * signInWithGoogle - description
         * need:
         * @returns {type}  description
         */
        function signInWithGoogle() {
            var that = this;
            this.Auth.$signInWithPopup("google").then(function(result) {
                // TODO: is this the right place to put saveUserData
                // reason I ask: should be updated every single time?  1 reason why it works is that if the photoURL changes(possibly display name)
                // UPDATE: looks like it may be by looking at the friendly pics demo routing.js
                that.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                that.state.go('profile');
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        }



    }
}
