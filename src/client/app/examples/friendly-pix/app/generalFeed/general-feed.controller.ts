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
    function GeneralFeedController($timeout, $firebaseAuth, feedService, postService) {

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
            feedService.showGeneralFeed().then(function(snap) {
                var dataFpTime = [];

                // Filter or customize the timestamp display - ft-time
                // TODO: Dry?
                angular.forEach(snap, (s) => {
                    s.timestamp = postService.getTimeText(s.timestamp);
                    dataFpTime.push(s);
                });

                vm.data = dataFpTime;
            });
            this.newPostsButtonText = feedService.newPostsButtonText;





        }






    }

}
