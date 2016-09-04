var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .config(initRouter);
    function initRouter($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('splash', {
            url: '/',
            controller: 'SplashController',
            controllerAs: 'sc',
            templateUrl: 'partials/home.splash.html',
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                        console.log(Auth.$waitForSignIn(), 'resolve wait for sign in');
                        return Auth.$waitForSignIn();
                    }]
            }
        })
            .state('profile', {
            url: '/profile/:uid',
            controller: 'ProfileController',
            controllerAs: 'pro',
            templateUrl: 'partials/profile.html',
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                        console.log(Auth.$requireSignIn(), 'resolve require simon');
                        return Auth.$requireSignIn();
                    }]
            }
        })
            .state('addPicture', {
            url: '/add-picture',
            controller: 'AddPictureController',
            controllerAs: 'ap',
            templateUrl: 'partials/add-picture.html',
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                        return Auth.$requireSignIn();
                    }]
            }
        });
    }
})(friendlyPix || (friendlyPix = {}));
