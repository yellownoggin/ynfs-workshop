namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('HomeController', HomeController)


    /**
     * HomeController
     * handles:
     * - splash page behavior and logic
     * - authorization & sending to users home feed
     */
    function HomeController($firebaseAuth, $timeout, currentAuth, $state) {
        //  1- get authorization state
        // 2 - show splash page  & login container t6his anonymous/unauthorized
        // 3. provide google oauth signin flow
        // - sign in pop-up
        // 4. send to home feed upon authorization
        // 5.  if visitor is authorized user
        // - show splash page without authorization container/skip to feed link
        // - fade out 2 home feed view
        this.showSplash = true;



        this.$onInit = function() {
        //     this.reload = function(){
    //will reload 'contact.detail' and 'contact.detail.item' states
  //   $state.reload('home');
  //   $state.reload('home.feed');
  //   console.log('state reloaded')
  // }
  // this.reload

            this.currentAuth = currentAuth;

            console.log('Home controller activated.');
            // $firebaseAuth().$signOut();
            this.showSplash = true;
            console.log(this.showSplash, 'showSplash');
            this.showLogin = this.currentAuth;
            // this.showLogin = !!currentAuth;

            this.signInWithGoogle = signInWithGoogle;
            // this.ifAuthed = ifAuthed

            // $firebaseAuth().$signOut();

            // console.log('currentAuth', currentAuth)
            // this.currentAuth = currentAuth;
            // console.log(currentAuth, 'currentAuth');
            // this.ifAuthed = ifAuthed;
// ifAuthed();
        }

ifAuthed();
var vm = this;
        function ifAuthed() {
            console.log(this.currentAuth);
            if(this.currentAuth) {
                $timeout(function() {
                    hideSplash();
                }, 5000)
            }
        }
        function signInWithGoogle() {
            console.log('google called');
            var that = this;
            $firebaseAuth().$signInWithPopup('google').then((result) => {
                console.log('google called')
                hideSplash();
            })
        }
        function hideSplash() {
            console.log('hideSplash');
            $timeout(function() {
                vm.showSplash = false;
                console.log(vm.showSplash);
            }, 1000)
        }








    }

}
