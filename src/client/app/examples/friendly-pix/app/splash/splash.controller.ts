namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('SplashController', SplashController);


    function SplashController($timeout, currentAuth, $firebaseAuth, firebaseFpService, $q ) {
        // TODO: login container needs to hide and show
        // - change this to shell controller
        // - the searchUsers does it need the wrapper?
        // + tried to do it but getting latinize error

        this.title = 'Splash Controller';

        var vm = this;
        this.$onInit = function() {


            // search users
            this.$q = $q;
            vm.firebaseFpService = firebaseFpService;
            this.searchUsers = searchUsers;
            // this.searchUsers1 = firebaseFpService.searchUsers;

            // console.log(this.searchUsers, 'search users');
            // / search users

            // vm.signOut = $firebaseAuth().$signOut();
            vm.auth = $firebaseAuth();
            vm.currentAuth = currentAuth;
            vm.signOutAndShowSplash = signOutAndShowSplash;
            // vm.signOut = $firebaseAuth().$signOut;
            this.showSplash = true;
            vm.hideSplash = hideSplash;
            vm.signInWithGoogle = signInWithGoogle;
            // vm.signInWithGithub = signInWithGithub;
            vm.signInWithEmailAndPassword = signInWithEmailAndPassword;
            vm.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
            // onInit methods





            ifAuthed();
        }


        ////////////////////Controller methods

        function ifAuthed() {
            console.log(vm.currentAuth, 'current authorization');

            if (vm.currentAuth) {
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

        function signOutAndShowSplash() {
            $firebaseAuth().$signOut();
            vm.showSplash = true;
        }


        function searchUsers(name, max) {
            var deferred = this.$q.defer();
            firebaseFpService.searchUsers(name, max).then((data) => {
                console.log(data);
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        ////////// Restricting these methods  & functionality for now
        // reason: e-mail & password sign-up scenario not sure how to handle profile information
        // specifically saveUserData
        // For github & twitter: the application needs to be using a public url


        function signInWithEmailAndPassword(email, password) {
            vm.auth.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                vm.hideSplash();
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        }
        function createUserWithEmailAndPassword(email, password) {

            vm.auth.$createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                vm.hideSplash();
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });

        }


        function signInWithGithub() {
            $firebaseAuth().$signInWithPopup('github').then((result) => {
                vm.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                vm.hideSplash();
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        }



    }
}
