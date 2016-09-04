namespace friendlyPix {
    'use strict';
// TODO: 1. sentence case display name full name user profile
// 2. refresh  loses uid in the url
// 3. refesh issues in general
//      - user profile refresh takes you back to splash page
//      - loses login in the site but not the user profle page
//      - when you click back to the user profile or home feed(user feed)

    class AuthenticationController {

        authObj: any;
        state: any;
        isUser: boolean;
        user: any;
        userId: string;
        fbArray: any;
        me: any;
        fullName: string;
        profilePic: string;
        params: any;
        uid: any;

        // TODO: needs static inject
        constructor(private $firebaseAuth, private $rootScope: ng.IRootScopeService, private $state: ng.ui.IStateService, private firebaseFpService, private $firebaseArray, private $firebaseObject, private $stateParams, private $timeout) {
            const Ref = 'https://friendly-pix-f2d0d.firebaseio.co'
            var vm = this;
            this.fbArray = $firebaseArray;
            this.state = $state;
            vm.authObj = $firebaseAuth();
            vm.user = vm.authObj.$getAuth();





            vm.isUser = false;
            this.firebaseFpService = firebaseFpService;
            this.showLogin(vm.user);

            $rootScope.$on('$stateChangeSuccess', (event, toState) => {
                var vm = this;
                var state = toState;
                var user = vm.authObj.$getAuth();
                this.showLogin(user);

                if (!user && (state.name === 'friendly.allFeed')) {
                    $state.go('friendly.allFeed');
                } else if (!user) {
                    $state.go('friendly.splash');
                    console.log(vm.user, 'user');
                } else if (user && (state.name === 'friendly.homeFeed')) {
                    $state.go('friendly.homeFeed');
                } else if (user && (state.name === 'friendly.user')) {
                    //  console.log(this.userId, 'userId');
                    //  console.log(vm.user, 'user');
                    // this.userId = vm.authObj.$getAuth();
                    // console.log(this.userId, 'userId');
                    // this.$timeout(() => {
                    //
                    //
                    //     vm.params = vm.$stateParams;
                    //     vm.uid = vm.params.uid;
                    //     console.log(vm.params, 'params');
                    // }, 2000)
                    let userRef = this.firebaseFpService.loadUserProfile(user.uid);
                    let userObj = $firebaseObject(userRef)
                     userObj.$loaded().then(() => {
                        this.fullName = userObj.full_name;
                        this.profilePic = userObj.profile_picture;
                    });
                    $state.go('friendly.user');

                } else {
                    $state.go('friendly.splash');
                }

            });
        }


        signInWithGoogle() {
            var vm = this;
            this.authObj.$signInWithPopup("google").then(function(result) {
                // console.log("Signed in as:", result.user.uid);
                console.log("Signed in as user:", result.user);

                // TODO: is this the right place to put saveUserData
                // reason I ask: should be updated every single time?  1 reason why it works is that if the photoURL changes(possibly display name)

                vm.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                vm.userId = result.user.uid
                vm.state.go('friendly.homeFeed');

            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        }

        signOut() {
            var vm = this;
            this.authObj.$signOut();
            this.authObj.$onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);

                } else {
                    console.log("Signed out");
                    vm.showLogin(vm.user);
                    console.log(vm.isUser);
                }
            });
        }

        showLogin(user) {

            if (user) {
                this.isUser = true;
                console.log(this.isUser, 'show login has been called true');
            } else {
                this.isUser = false;
                console.log(this.isUser, 'show login has been called false');
            }
        }


    }

    angular
        .module('friendlyPix')
        .controller('AuthenticationController', AuthenticationController);
}
