namespace friendlyPix {
    'use strict';

    angular
        .module('friendlyPix')
        .config(initRouter);

    /**
     * Initialize the router's default behaviors
     */
    //  TODO:  make sure this is working(need ngannotate)
    // @ngInject
    function initRouter($urlRouterProvider, $stateProvider) {

        // TODO:  need to add this holding off for development
        //  $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('splash', {
                url: '/',
                controller: 'SplashController',
                controllerAs: 'sc',
                templateUrl: 'partials/home.splash.html',
                resolve: {
                    "currentAuth": ["Auth", function(Auth) {
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
                    "currentAuth": ["Auth", function(Auth) {
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
                    "currentAuth": ["Auth", function(Auth) {
                        return Auth.$requireSignIn();
                    }]
                }
            });











            // .state('homeFeed', {
            //     url: 'user-feed',
            //     template: '<h1>user feed</h1>'
            // })
            // .state('allFeed', {
            //     url: '/all-feed',
            //     template: '<h1>all-feed</h1>'
            //     // TODO:  need to figure this out control instantiation on the router
            //     // controller: 'AuthenticationController
            // })
            // .state('user', {
            //     url: 'user/:uid',
            //     templateUrl: 'partials/friendly.user.html',
            //     controller: function () {
            //
            //     }
            //             // TODO:  need to figure this out control instantiation on the router
            //             // controller: 'AuthenticationController
            // });
    }

}
