var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .controller('HomeController', HomeController);
    function HomeController($timeout, $firebaseAuth) {
        this.$onInit = function () {
            var authorization = $firebaseAuth().$getAuth();
            console.log(authorization, 'authorization');
            console.log('Home controller activated.');
        };
    }
})(friendlyPix || (friendlyPix = {}));
