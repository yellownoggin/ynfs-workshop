var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('userPageService', userPageService);
    function userPageService(firebaseFpService) {
        this.loadUser = loadUser;
        function loadUser(userId, avatarBinding, userNameBinding) {
            this.userId = userId;
            var that = this;
            that.avatarBinding = avatarBinding;
            that.userNameBinding = userNameBinding;
            return firebaseFpService.loadUserProfile(userId).then(function (snapshot) {
                var userInfo = snapshot.val();
                if (userInfo) {
                    return userInfo;
                }
                else {
                    console.log('This user does not exist.');
                }
            });
        }
    }
})(friendlyPix || (friendlyPix = {}));
