var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('SplashController', SplashController);
    function SplashController(currentAuth, Auth, $state, firebaseFpService) {
        this.title = 'Splash Controller';
        this.isUser = false;
        this.$onInit = function () {
            this.currentAuth = currentAuth;
            this.Auth = Auth;
            this.state = $state;
            this.getCurrentAuth = getCurrentAuth;
            this.showLogin = showLogin;
            this.firebaseFpService = firebaseFpService;
            this.getCurrentAuth();
            this.showLogin(this.currentAuth);
            this.signInWithGoogle = signInWithGoogle;
        };
        function getCurrentAuth() {
            if (this.currentAuth) {
                this.uid = this.currentAuth.uid;
            }
            else {
                this.uid = '';
            }
        }
        function showLogin(userId) {
            if (userId) {
                this.isUser = true;
                console.log(this.isUser, 'show login has been called true');
            }
            else {
                this.isUser = false;
                console.log(this.isUser, 'show login has been called false');
            }
        }
        function signInWithGoogle() {
            var that = this;
            this.Auth.$signInWithPopup("google").then(function (result) {
                that.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                that.state.go('profile');
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        }
    }
})(friendlyPix || (friendlyPix = {}));
