var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .service('userPageService', userPageService);
    function userPageService(firebaseFpService) {
        this.loadUser = loadUser;
        this.onFollowChange = onFollowChange;
        function loadUser(userId, avatarBinding, userNameBinding, currentAuthedUserId) {
            this.userId = userId;
            this.currentAuthedUserId = currentAuthedUserId;
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
        function onFollowChange(checkedStatus, followedUid) {
            var checked = checkedStatus;
            var fUid = followedUid;
            console.log('checkedStatus', checkedStatus);
            console.log('this.userId', followedUid);
            return firebaseFpService.toggleFollowUser(fUid, checked);
        }
    }
})(friendlyPix || (friendlyPix = {}));
