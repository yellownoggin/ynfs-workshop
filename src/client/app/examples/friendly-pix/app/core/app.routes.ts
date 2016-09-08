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

        // Show home.feed state on '/' (nested state)
        // Solution came from faq's ui-router:  https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-set-up-a-defaultindex-child-state

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                abstract: true,
                views: {
                    shell: {
                        controller: 'SplashController',
                        controllerAs: 'sc',
                        templateUrl: 'app/layout/shell.html',
                        resolve: {
                            "currentAuth": ["$firebaseAuth", function($firebaseAuth) {
                                return $firebaseAuth().$waitForSignIn();
                                // console.log($firebaseAuth, 'current auth')
                            }]
                        }
                    }
                }

            })
            .state('home.feed', {
                url: '',
                views: {
                    content: {
                        controller: 'HomeController',
                        controllerAs: 'hc',
                        templateUrl: 'app/splash/home.splash.html'
                    }
                }
            });
        // .state('profile', {
        //     url: '/profile/:uid',
        //     controller: 'ProfileController',
        //     controllerAs: 'pro',
        //     templateUrl: 'partials/profile.html',
        //     resolve: {
        //         "currentAuth": ["Auth", function(Auth) {
        //             console.log(Auth.$requireSignIn(), 'resolve require simon');
        //             return Auth.$requireSignIn();
        //         }]
        //     }
        // })
        // .state('addPicture', {
        //     url: '/add-picture',
        //     controller: 'AddPictureController',
        //     controllerAs: 'ap',
        //     templateUrl: 'partials/add-picture.html',
        //     resolve: {
        //         "currentAuth": ["Auth", function(Auth) {
        //             return Auth.$requireSignIn();
        //         }]
        //     }
        // });











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
