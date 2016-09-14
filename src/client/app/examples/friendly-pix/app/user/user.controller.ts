namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('UserController', UserController);

    function UserController($firebaseAuth, $stateParams, userPageService) {

        this.$onInit = () => {
            console.log('User controller initiated');
            var vm = this;
            this.firebaseAuth = $firebaseAuth;
            this.user = this.firebaseAuth().$getAuth();

            console.log($stateParams.uid, '$stateParams');
            // get user profile info from the id from all users
            // then get name and
            // this.avatar = '';
            // this.name = '';
            userPageService.loadUser($stateParams.uid, this.avatar, this.name).then((data) => {
                console.log(data, 'data inside the user controller');

                vm.profilePic = data.profile_picture;
                vm.fullName = data.full_name;
            });
        }

    }
}
