namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('ProfileController', ProfileController);

    function ProfileController(currentAuth, firebaseFpService, $firebaseObject) {

        this.$onInit = function() {
            // config
            this.title = 'Profile Controller';
            this.currentAuth = currentAuth;
            this.uid = this.currentAuth.uid;
            this.displayProfileInfo = displayProfileInfo;
            this.firebaseFpService = firebaseFpService;

            // call
            this.displayProfileInfo();
            // this.storage = firebase.database();
            // const picRef = this.storage.ref(`${this.currentAuth.uid}/full/${Date.now()}/filename`);
            // console.log(picRef, 'picRef');
        }



        ////////////////////// Controller methods

        function displayProfileInfo() {
            var that = this;
            var userRef = this.firebaseFpService.loadUserProfile(this.uid);
            var userObject = $firebaseObject(userRef);

            userObject.$loaded().then(() => {
                that.fullName = userObject.full_name;
                that.profilePic = userObject.profile_picture;
            });

        }


        /////Image upload methods

        // function readFile() {
        //     // Clear the uploader.
        //     this.clear();
        // }
        //
        // function clear() {
        //     this.currentFile = null;
        //
        //     // Cancel all Firebase listeners
        //
        //     // Clear previously display pic
        //
        //     // Clear the text field
        //
        //     // Make sure UI is not disabled
        // }



    }
}
