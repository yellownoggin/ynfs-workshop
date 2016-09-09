var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('GeneralFeedController', GeneralFeedController);
    function GeneralFeedController($timeout, $firebaseAuth, feedService) {
        this.$onInit = function () {
            var vm = this;
            console.log('General Feed controller activated.');
            this.user = $firebaseAuth().$getAuth();
            this.data = {};
            feedService.showGeneralFeed().then(function (a) {
                vm.data = a;
            });
            this.newPostsButtonText = feedService.newPostsButtonText;
        };
    }
})(friendlyPix || (friendlyPix = {}));
