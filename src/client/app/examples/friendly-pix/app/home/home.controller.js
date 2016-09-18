var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('HomeController', HomeController);
    function HomeController($timeout, $firebaseAuth, feedService, postService) {
        this.$onInit = function () {
            var vm = this;
            console.log('Home controller activated.');
            this.user = $firebaseAuth().$getAuth();
            this.data = {};
            feedService.showHomeFeed().then(function (snap) {
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
