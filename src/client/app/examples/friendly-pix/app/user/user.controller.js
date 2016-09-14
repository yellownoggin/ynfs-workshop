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
            _this.firebaseFpService = firebaseFpService;
            _this.registerForPostsCount = registerForPostsCount;
            _this.registerForFollowers = registerForFollowers;
            _this.canFollow = canFollow;
            _this.canFollow();
            userPageService.loadUser($stateParams.uid, _this.avatar, _this.name, _this.user.uid).then(function (data) {
                console.log(data, 'data inside the user controller');
                vm.profilePic = data.profile_picture;
                vm.fullName = data.full_name;
            });
            _this.registerForPostsCount($stateParams.uid, function (nbPosts) {
                console.log(nbPosts, 'nbPosts');
                _this.numberOfPosts = nbPosts;
            });
            _this.registerForFollowers($stateParams.uid, function (nbFollowers) {
                console.log(nbFollowers, 'nbFollowers');
                _this.numberOfFollowers = nbFollowers;
            });
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
        function registerForFollowers(uid, cb) {
            this.firebaseFpService.registerForFollowers(uid, cb);
        }
    }
})(friendlyPix || (friendlyPix = {}));
