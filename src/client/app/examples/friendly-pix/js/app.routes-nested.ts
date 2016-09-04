// // child routes version - difficult
// //  1. couldn't figure out how to use controller property
// //  2. try later
// namespace friendlyPix {
//     'use strict';
//
//     angular
//         .module('friendlyPix')
//         .config(initRouter);
//
//
//     /**
//      * Initialize the router's default behaviors
//      */
//     //  TODO:  make sure this is working(need ngannotate)
//     // @ngInject
//     function initRouter($urlRouterProvider, $stateProvider) {
//
//         // TODO:  need to add this holding off for development
//         //  $locationProvider.html5Mode(true);
//         $urlRouterProvider.otherwise('/');
//
//         $stateProvider
//             .state('friendly', {
//                 abstract: 'true',
//                 url: '/',
//                 template: '<ui-view/>'
//                 // TODO:  need to figure this out control instantiation on the router
//                 // controller: 'AuthenticationController'
//             })
//             .state('friendly.splash', {
//                 url: 'splash',
//                 templateUrl: 'partials/home.splash.html'
//                 // templateUrl: 'partials/home.splash.html'
//                 // views: {
//                 //     view1: {
//                 //         template: 'partials/home.splash.html'
//                 //         // TODO:  need to figure this out control instantiation on the router
//                 //         // controller: 'AuthenticationController'
//                 //     }
//                 // }
//             })
//             .state('friendly.homeFeed', {
//                 url: 'user-feed',
//                 template: '<h1>user feed</h1>'
//             })
//             .state('friendly.allFeed', {
//                 url: '/all-feed',
//                 template: '<h1>all-feed</h1>'
//                 // TODO:  need to figure this out control instantiation on the router
//                 // controller: 'AuthenticationController
//             })
//             .state('friendly.user', {
//                 url: 'user/:uid',
//                 templateUrl: 'partials/friendly.user.html'
//                         // TODO:  need to figure this out control instantiation on the router
//                         // controller: 'AuthenticationController
//             });
//     }
//
// }
