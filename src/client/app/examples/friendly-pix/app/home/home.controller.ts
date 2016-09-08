namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .controller('HomeController', HomeController)


    /**
     * HomeController
     * handles:
     * - splash page behavior and logic
     * - authorization & sending to users home feed
     */
    function HomeController($timeout, $firebaseAuth, feedService) {

        // TODO:
        // - show home feed(get home feed data)
        // - displayed simply
        // -  then work the details



        this.$onInit = function() {
            var vm = this;
            console.log('Home controller activated.');
            this.user = $firebaseAuth().$getAuth();
            this.data = {};
            // console.log(authorization, 'authorization');
            feedService.showHomeFeed().then(function (a) {
                vm.data = a;
            });
            // console.log(a, 'feedService');




        }






    }

}
