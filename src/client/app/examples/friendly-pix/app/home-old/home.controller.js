var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('HomeController', HomeController);
    function HomeController($firebaseAuth, $timeout, currentAuth, $state) {
        this.showSplash = true;
        this.$onInit = function () {
            this.currentAuth = currentAuth;
            console.log('Home controller activated.');
            this.showSplash = true;
            console.log(this.showSplash, 'showSplash');
            this.showLogin = this.currentAuth;
            this.signInWithGoogle = signInWithGoogle;
        };
        ifAuthed();
        var vm = this;
        function ifAuthed() {
            console.log(this.currentAuth);
            if (this.currentAuth) {
                $timeout(function () {
                    hideSplash();
                }, 5000);
            }
        }
        function signInWithGoogle() {
            console.log('google called');
            var that = this;
            $firebaseAuth().$signInWithPopup('google').then(function (result) {
                console.log('google called');
                hideSplash();
            });
        }
        function hideSplash() {
            console.log('hideSplash');
            $timeout(function () {
                vm.showSplash = false;
                console.log(vm.showSplash);
            }, 1000);
        }
    }
})(friendlyPix || (friendlyPix = {}));
