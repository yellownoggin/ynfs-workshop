var ynfsworkshop;
(function (ynfsworkshop) {
    'use strict';
    angular
        .module('ynfsworkshop')
        .config(configRoutes);
    function configRoutes($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('landing', {
            url: '/',
            controller: 'LandingController',
            controllerAs: 'lc',
            views: {
                shell: {
                    templateUrl: 'app/landing/landing.html',
                }
            }
        });
    }
})(ynfsworkshop || (ynfsworkshop = {}));
