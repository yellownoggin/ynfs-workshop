var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('HomeController', HomeController);
    function HomeController($timeout, $firebaseAuth, feedService) {
        this.$onInit = function () {
            var vm = this;
            console.log('Home controller activated.');
            this.user = $firebaseAuth().$getAuth();
            this.data = {};
            feedService.showHomeFeed().then(function (a) {
                vm.data = a;
            });
        };
    }
})(friendlyPix || (friendlyPix = {}));
