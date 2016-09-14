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


            /**
              * Displays the given user information in the UI.
              */
            //   Get the user id from the controller - stateparams

            function loadUser (userId, avatarBinding, userNameBinding ) {
                // not sure why i need I this.
                this.userId = userId;

                var that = this;


                that.avatarBinding = avatarBinding;
                that.userNameBinding = userNameBinding;

                // Reset UI
                // this.clear();

                // If users is the currently signed-in user we hide the "Follow" Checkbox.
                // .../


                return firebaseFpService.loadUserProfile(userId).then(snapshot => {
                    const userInfo = snapshot.val();
                    if(userInfo) {
                        return userInfo;
                    } else {
                        // toast stuff
                        console.log('This user does not exist.');
                    }

                });





            }
        }
}
