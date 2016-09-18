var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('GeneralFeedController', GeneralFeedController);
    function GeneralFeedController($timeout, $firebaseAuth, feedService, postService) {
        this.$onInit = function () {
            var vm = this;
            console.log('General Feed controller activated.');
            this.user = $firebaseAuth().$getAuth();
            this.data = {};
            feedService.showGeneralFeed().then(function (snap) {
                var dataFpTime = [];
                angular.forEach(snap, function (s) {
                    s.timestamp = postService.getTimeText(s.timestamp);
                    dataFpTime.push(s);
                });
                vm.data = dataFpTime;
            });
            this.newPostsButtonText = feedService.newPostsButtonText;
        };
    }
})(friendlyPix || (friendlyPix = {}));
