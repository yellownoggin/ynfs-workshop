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
            _this.registerForFollowing = registerForFollowing;
            _this.showUsersFollowed = false;
            _this.canFollow = canFollow;
            _this.canFollow();
            userPageService.loadUser($stateParams.uid, _this.avatar, _this.name, _this.user.uid).then(function (data) {
                console.log(data, 'data inside the user controller');
                vm.profilePic = data.profile_picture;
                vm.fullName = data.full_name;
            });
            _this.registerForPostsCount($stateParams.uid, function (nbPosts) {
                _this.numberOfPosts = nbPosts;
            });
            _this.registerForFollowers($stateParams.uid, function (nbFollowers) {
                _this.numberOfFollowers = nbFollowers;
            });
            _this.registerForFollowing($stateParams.uid, function (nbFollowing) {
                _this.numberOfFollowing = nbFollowing;
            });
            _this.firebaseFpService.getFollowingProfiles($stateParams.uid).then(function (profiles) {
                _this.usersFollowedInfo = {};
                _this.usersFollowedArray = [];
                Object.keys(profiles).forEach(function (uid) {
                    var userInfoObj = {
                        uid: uid,
                        profilePic: profiles[uid].profile_picture,
                        fullName: profiles[uid]._search_index.fullName
                    };
                    _this.usersFollowedArray.push(userInfoObj);
                });
                console.log(_this.usersFollowedArray, 'usersFollowedArray');
            });
            _this.firebaseFpService.getUserFeedPosts($stateParams.uid).then(function (data) {
                var userFeedPostsArray = [];
                var postsIds = Object.keys(data.entries);
                postsIds.forEach(function (postId) {
                    var userFeedPosts = {
                        postId: postId,
                        thumbUrl: data.entries[postId].thumb_url,
                        text: data.entries[postId].text
                    };
                    userFeedPostsArray.push(userFeedPosts);
                });
                _this.userFeedPostsArray = userFeedPostsArray;
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
            this.firebaseFpService.registerForFollowersCount(uid, cb);
        }
        function registerForFollowing(uid, cb) {
            this.firebaseFpService.registerForFollowingCount(uid, cb);
        }
    }
})(friendlyPix || (friendlyPix = {}));
