namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('GeneralFeedController', GeneralFeedController)


    /**
     * HomeController
     * handles:
     * - splash page behavior and logic
     * - authorization & sending to users home feed
     */
    function GeneralFeedController($timeout, $firebaseAuth, feedService) {

        // TODO:
        // - show home feed(get home feed data)
        // - displayed simply
        // -  then work the details



        this.$onInit = function() {
            var vm = this;
            console.log('General Feed controller activated.');
            this.user = $firebaseAuth().$getAuth();
            this.data = {};
            // console.log(authorization, 'authorization');
            feedService.showGeneralFeed().then(function (a) {
                vm.data = a;
            });
            this.newPostsButtonText  = feedService.newPostsButtonText;
            // console.log(a, 'feedService');




        }






    }

}
