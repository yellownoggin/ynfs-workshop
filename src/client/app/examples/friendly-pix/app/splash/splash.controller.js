var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('SplashController', SplashController);
    function SplashController($timeout, currentAuth, $firebaseAuth) {
        this.title = 'Splash Controller';
        var vm = this;
        this.$onInit = function () {
            console.log('vm.title');
            console.log(currentAuth, 'currentAuth');
            vm.signOut = $firebaseAuth().$signOut();
            vm.currentAuth = currentAuth;
            this.showSplash = true;
            vm.hideSplash = hideSplash;
            vm.signInWithGoogle = signInWithGoogle;
            ifAuthed();
        };
        function ifAuthed() {
            console.log(vm.currentAuth, 'current authorization');
            if (vm.currentAuth) {
                $timeout(function () {
                    vm.hideSplash();
                }, 1000);
            }
        }
        function hideSplash() {
            $timeout(function () {
                vm.showSplash = false;
            }, 1000);
        }
        function signInWithGoogle() {
            console.log('google called');
            $firebaseAuth().$signInWithPopup('google').then(function (result) {
                console.log('google called');
                vm.hideSplash();
            });
        }
    }
})(friendlyPix || (friendlyPix = {}));
