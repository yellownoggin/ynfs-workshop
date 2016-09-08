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
        });
    }
})(friendlyPix || (friendlyPix = {}));
