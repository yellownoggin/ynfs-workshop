var friendlyPix;
(function (friendlyPix) {
    'use strict';
    angular
        .module('friendlyPix')
        .config(initRouter);
    function initRouter($urlRouterProvider, $stateProvider) {
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
                        "currentAuth": ["$firebaseAuth", function ($firebaseAuth) {
                                return $firebaseAuth().$waitForSignIn();
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
        })
            .state('home.addPicture', {
            url: 'add-picture',
            views: {
                content: {
                    controller: 'AddPictureController',
                    controllerAs: 'ap',
                    templateUrl: 'partials/add-picture.html'
                }
            }
        })
            .state('home.generalFeed', {
            url: 'general-feed',
            views: {
                content: {
                    controller: 'GeneralFeedController',
                    controllerAs: 'gc',
                    templateUrl: 'app/generalFeed/general-feed.html'
                }
            }
        })
            .state('home.user', {
            url: 'user/:uid',
            views: {
                content: {
                    controller: 'UserController',
                    controllerAs: 'uc',
                    templateUrl: 'app/user/user.html'
                }
            }
        })
            .state('home.posts', {
            url: 'posts/:postId',
            views: {
                content: {
                    controller: 'UserController',
                    controllerAs: 'uc',
                    templateUrl: 'app/user/user.html'
                }
            }
        });
    }
})(friendlyPix || (friendlyPix = {}));
