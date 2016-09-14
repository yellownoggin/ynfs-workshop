// loaduser
// = store the user id for the page
// - if the user matches the curresnt user authed on this session
// - hide the follw switch button container
// - else show
// + do some other stuff * (come back)
//
//
// - load users profile information
// + firebase.loadUserProfile(uid)
// * then
//     - save/store snapshot val in userInfo
//     if userInfo
//

namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .service('userPageService', userPageService);

    function userPageService(firebaseFpService) {

        this.loadUser = loadUser;
        this.onFollowChange = onFollowChange;


        /**
          * Displays the given user information in the UI.
          */
        //   Get the user id from the controller - stateparams

        function loadUser(userId, avatarBinding, userNameBinding, currentAuthedUserId) {
            // not sure why i need I this.
            this.userId = userId;
            this.currentAuthedUserId = currentAuthedUserId;



            var that = this;


            that.avatarBinding = avatarBinding;
            that.userNameBinding = userNameBinding;

            // Reset UI
            // this.clear();

            // If users is the currently signed-in user we hide the "Follow" Checkbox.
            // .../


            return firebaseFpService.loadUserProfile(userId).then(snapshot => {
                const userInfo = snapshot.val();
                if (userInfo) {
                    return userInfo;
                } else {
                    // toast stuff
                    console.log('This user does not exist.');
                }

            });

        }



        /**
         * Triggered when the user changes the "Follow" checkbox.
         */
        // TODO: why is there is a return
        // checkedStatus: different from demo
        // disabled??
        function onFollowChange(checkedStatus, followedUid) {
            const checked = checkedStatus
            var fUid = followedUid;
            // this.followCheckbox.prop('disabled', true);
            console.log('checkedStatus', checkedStatus);
            console.log('this.userId', followedUid);
            return firebaseFpService.toggleFollowUser(fUid, checked);
        }

        //   this.followCheckbox.change(() => this.onFollowChange());
        //
        // Original: demo using jQuery - different way to determin the checked status of element/user
        // function onFollowChange() {
        //     const checked = this.followCheckbox.prop('checked');
        //     this.followCheckbox.prop('disabled', true);
        //
        //     return friendlyPix.firebase.toggleFollowUser(this.userId, checked);
        // }
    }
}
