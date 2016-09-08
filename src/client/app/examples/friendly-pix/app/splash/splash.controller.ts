namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('SplashController', SplashController);


    function SplashController($timeout, currentAuth, $firebaseAuth, firebaseFpService) {


        this.title = 'Splash Controller';

        var vm = this;
        this.$onInit = function() {
            console.log('vm.title');
            console.log(currentAuth, 'currentAuth');
            vm.firebaseFpService = firebaseFpService;
            vm.signOut = $firebaseAuth().$signOut();
            vm.currentAuth = currentAuth;
            this.showSplash = true;
            vm.hideSplash = hideSplash;
            vm.signInWithGoogle = signInWithGoogle;
            // onInit methods

            ifAuthed();
        }


        ////////////////////Controller methods

        function ifAuthed() {
            console.log(vm.currentAuth, 'current authorization');

            if(vm.currentAuth) {
                $timeout(function() {
                    vm.hideSplash();
                }, 1000)
            }
        }

        function hideSplash() {
            $timeout(function() {
                vm.showSplash = false;

            }, 1000)
        }

        function signInWithGoogle() {
            console.log('google called');
            $firebaseAuth().$signInWithPopup('google').then((result) => {
                vm.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                vm.hideSplash();
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        }


    }
}
