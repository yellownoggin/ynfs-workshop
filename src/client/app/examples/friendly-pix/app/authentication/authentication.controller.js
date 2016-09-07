var friendlyPix;
(function (friendlyPix) {
    'use strict';
    var AuthenticationController = (function () {
        function AuthenticationController($firebaseAuth, $rootScope, $state, firebaseFpService, $firebaseArray, $firebaseObject, $stateParams, $timeout) {
            var _this = this;
            this.$firebaseAuth = $firebaseAuth;
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.firebaseFpService = firebaseFpService;
            this.$firebaseArray = $firebaseArray;
            this.$firebaseObject = $firebaseObject;
            this.$stateParams = $stateParams;
            this.$timeout = $timeout;
            var Ref = 'https://friendly-pix-f2d0d.firebaseio.co';
            var vm = this;
            this.fbArray = $firebaseArray;
            this.state = $state;
            vm.authObj = $firebaseAuth();
            vm.user = vm.authObj.$getAuth();
            vm.isUser = false;
            this.firebaseFpService = firebaseFpService;
            this.showLogin(vm.user);
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                var vm = _this;
                var state = toState;
                var user = vm.authObj.$getAuth();
                _this.showLogin(user);
                if (!user && (state.name === 'friendly.allFeed')) {
                    $state.go('friendly.allFeed');
                }
                else if (!user) {
                    $state.go('friendly.splash');
                    console.log(vm.user, 'user');
                }
                else if (user && (state.name === 'friendly.homeFeed')) {
                    $state.go('friendly.homeFeed');
                }
                else if (user && (state.name === 'friendly.user')) {
                    var userRef = _this.firebaseFpService.loadUserProfile(user.uid);
                    var userObj_1 = $firebaseObject(userRef);
                    userObj_1.$loaded().then(function () {
                        _this.fullName = userObj_1.full_name;
                        _this.profilePic = userObj_1.profile_picture;
                    });
                    $state.go('friendly.user');
                }
                else {
                    $state.go('friendly.splash');
                }
            });
        }
        AuthenticationController.prototype.signInWithGoogle = function () {
            var vm = this;
            this.authObj.$signInWithPopup("google").then(function (result) {
                console.log("Signed in as user:", result.user);
                vm.firebaseFpService.saveUserData(result.user.photoURL, result.user.displayName);
                vm.userId = result.user.uid;
                vm.state.go('friendly.homeFeed');
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        };
        AuthenticationController.prototype.signOut = function () {
            var vm = this;
            this.authObj.$signOut();
            this.authObj.$onAuthStateChanged(function (firebaseUser) {
                if (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                }
                else {
                    console.log("Signed out");
                    vm.showLogin(vm.user);
                    console.log(vm.isUser);
                }
            });
        };
        AuthenticationController.prototype.showLogin = function (user) {
            if (user) {
                this.isUser = true;
                console.log(this.isUser, 'show login has been called true');
            }
            else {
                this.isUser = false;
                console.log(this.isUser, 'show login has been called false');
            }
        };
        return AuthenticationController;
    }());
    angular
        .module('friendlyPix')
        .controller('AuthenticationController', AuthenticationController);
})(friendlyPix || (friendlyPix = {}));
