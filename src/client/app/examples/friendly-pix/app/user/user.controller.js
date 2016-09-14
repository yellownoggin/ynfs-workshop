var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('UserController', UserController);
    function UserController($firebaseAuth, $stateParams, userPageService, firebaseFpService) {
        var _this = this;
        this.$onInit = function () {
            console.log('User controller initiated');
            var vm = _this;
            vm.showFollowContainer = false;
            _this.firebaseAuth = $firebaseAuth;
            _this.user = _this.firebaseAuth().$getAuth();
            _this.onFollowChange = userPageService.onFollowChange;
            _this.currentUserPageUid = $stateParams.uid;
            _this.canFollow = canFollow;
            _this.canFollow();
            userPageService.loadUser($stateParams.uid, _this.avatar, _this.name, _this.user.uid).then(function (data) {
                console.log(data, 'data inside the user controller');
                vm.profilePic = data.profile_picture;
                vm.fullName = data.full_name;
            });
            registerForPostsCount($stateParams.uid, function (nbPosts) { return _this.numberOfPosts = nbPosts; });
        };
        function canFollow() {
            if (this.user.uid === this.currentUserPageUid) {
                this.showFollowContainer = false;
            }
            else {
                this.showFollowContainer = true;
            }
        }
        function registerForPostsCount(uid, cb) {
            this.firebaseFpService.registerForPostsCount(uid, cb);
        }
    }
})(friendlyPix || (friendlyPix = {}));
