var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('ProfileController', ProfileController);
    function ProfileController(currentAuth, firebaseFpService, $firebaseObject) {
        this.$onInit = function () {
            this.title = 'Profile Controller';
            this.currentAuth = currentAuth;
            this.uid = this.currentAuth.uid;
            this.displayProfileInfo = displayProfileInfo;
            this.firebaseFpService = firebaseFpService;
            this.displayProfileInfo();
        };
        function displayProfileInfo() {
            var that = this;
            var userRef = this.firebaseFpService.loadUserProfile(this.uid);
            var userObject = $firebaseObject(userRef);
            userObject.$loaded().then(function () {
                that.fullName = userObject.full_name;
                that.profilePic = userObject.profile_picture;
            });
        }
    }
})(friendlyPix || (friendlyPix = {}));
