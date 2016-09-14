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
            this.registerForPostsCount = registerForPostsCount
            this.canFollow = canFollow;
            this.canFollow();



            // probably want to separate this into userPageService
            // doing this now - to simplify at the time for logic and understanding while first stage of dev.


            userPageService.loadUser($stateParams.uid, this.avatar, this.name, this.user.uid).then((data) => {
                console.log(data, 'data inside the user controller');

                vm.profilePic = data.profile_picture;
                vm.fullName = data.full_name;
            });

            this.registerForPostsCount($stateParams.uid,
                nbPosts => {
                    console.log(nbPosts, 'nbPosts');
                    this.numberOfPosts = nbPosts
                }

        );


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

    } // controller

}   // namespace
