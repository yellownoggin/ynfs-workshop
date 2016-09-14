namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('UserController', UserController);

    function UserController($firebaseAuth, $stateParams, userPageService, firebaseFpService) {

        this.$onInit = () => {
            console.log('User controller initiated');
            var vm = this;
            vm.showFollowContainer = false;


            this.firebaseAuth = $firebaseAuth;
            this.user = this.firebaseAuth().$getAuth();
            this.onFollowChange = userPageService.onFollowChange;
            this.currentUserPageUid = $stateParams.uid;
            this.firebaseFpService = firebaseFpService;

            // meta info
            this.registerForPostsCount = registerForPostsCount
            this.registerForFollowers = registerForFollowers;
            this.registerForFollowing = registerForFollowing;
            this.showUsersFollowed  = false;

            this.canFollow = canFollow;
            this.canFollow();



            // probably want to separate this into userPageService
            // doing this now - to simplify at the time for logic and understanding while first stage of dev.


            userPageService.loadUser($stateParams.uid, this.avatar, this.name, this.user.uid).then((data) => {
                console.log(data, 'data inside the user controller');

                vm.profilePic = data.profile_picture;
                vm.fullName = data.full_name;
            });


            // call meta methods
            this.registerForPostsCount($stateParams.uid,
                nbPosts => {

                    this.numberOfPosts = nbPosts
                });

            this.registerForFollowers($stateParams.uid,
                nbFollowers => {

                    this.numberOfFollowers = nbFollowers;
                });

            this.registerForFollowing($stateParams.uid,
                nbFollowing =>  {

                    this.numberOfFollowing = nbFollowing;
                });


            this.firebaseFpService.getFollowingProfiles($stateParams.uid).then(profiles => {
                this.usersFollowedInfo = {};
                this.usersFollowedArray = [];

                 Object.keys(profiles).forEach(uid => {
                     var userInfoObj = {
                         uid: uid,
                         profilePic: profiles[uid].profile_picture,
                         fullName: profiles[uid]._search_index.fullName
                     };

                     this.usersFollowedArray.push(userInfoObj);

                 });
                console.log(this.usersFollowedArray, 'usersFollowedArray');
            });


    } // end onInit


        function canFollow() {
            if (this.user.uid === this.currentUserPageUid) {
                 this.showFollowContainer = false;
            } else {
                this.showFollowContainer = true;
            }
        }

        function registerForPostsCount(uid, cb) {
            this.firebaseFpService.registerForPostsCount(uid, cb);
        }

        function registerForFollowers(uid, cb){
            this.firebaseFpService.registerForFollowersCount(uid, cb);
        }

        function registerForFollowing(uid, cb){
            this.firebaseFpService.registerForFollowingCount(uid, cb);
        }



    } // controller

}   // namespace
