var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('SplashController', SplashController);
    function SplashController($timeout, currentAuth, $firebaseAuth, firebaseFpService, $q) {
        this.title = 'Splash Controller';
        var vm = this;
        this.$onInit = function () {
            this.$q = $q;
            vm.firebaseFpService = firebaseFpService;
            this.searchUsers = searchUsers;
            vm.auth = $firebaseAuth();
            vm.currentAuth = currentAuth;
            vm.signOutAndShowSplash = signOutAndShowSplash;
            this.showSplash = true;
            vm.hideSplash = hideSplash;
            vm.signInWithGoogle = signInWithGoogle;
            vm.signInWithEmailAndPassword = signInWithEmailAndPassword;
            vm.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
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
                vm.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                vm.hideSplash();
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        }
        function signOutAndShowSplash() {
            $firebaseAuth().$signOut();
            vm.showSplash = true;
        }
        function searchUsers(name, max) {
            var deferred = this.$q.defer();
            firebaseFpService.searchUsers(name, max).then(function (data) {
                console.log(data);
                deferred.resolve(data);
            });
            return deferred.promise;
        }
        function signInWithEmailAndPassword(email, password) {
            vm.auth.$signInWithEmailAndPassword(email, password).then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                vm.hideSplash();
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        }
        function createUserWithEmailAndPassword(email, password) {
            vm.auth.$createUserWithEmailAndPassword(email, password).then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                vm.hideSplash();
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        }
        function signInWithGithub() {
            $firebaseAuth().$signInWithPopup('github').then(function (result) {
                vm.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                vm.hideSplash();
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        }
    }
})(friendlyPix || (friendlyPix = {}));
